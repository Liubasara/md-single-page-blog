<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>
    <button @click="currentPage += 1">下一章</button>
    <button @click="loadAllContents">loadAllContents</button>
  </div>

  <div ref="bodyRef" v-html="currentBlogBody" style="height: 200px"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch, reactive, nextTick } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import directory from 'articleDist/directory/directory.json'
import URIJS from 'urijs'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const currentPage = ref(0)
    const allArticleBody: Array<string> = reactive([])
    let currentBlog: { url?: string; [key: string]: any } = reactive({})
    let currentBlogBody = ref('')
    const bodyRef = ref()

    // https://vitejs.dev/guide/features.html#glob-import vite 专有语法，打包固定文件
    const modules = import.meta.glob('/../article/dist/allArticle/**/*.*')
    const moduleKeys = Object.keys(modules)
    console.log(modules)

    // preFetch 所有文章
    const loadAllContents = async function () {
      const { default: allContents } = await new Promise((resolve) => {
        // 主动延迟测试 idle 效果
        setTimeout(async function load() {
          const res = await import('articleDist/allContents/allContents.json')
          resolve(res)
        }, 2000)
      })
      console.log('allContents', allContents)
    }
    window.requestIdleCallback(loadAllContents)

    watch([allArticleBody, currentPage], (newVal, prevVal) => {
      const [newAllArticleBodyVal, newCurrentPageVal] = newVal
      let currentBlogBodyVal = newAllArticleBodyVal[newCurrentPageVal]
      let currentBlogVal = directory[newCurrentPageVal]
      if (!currentBlogBodyVal) {
        currentPage.value = 0
      } else {
        currentBlogBody.value = currentBlogBodyVal
        currentBlog = currentBlogVal
      }
    })
    watch(currentBlogBody, () => {
      nextTick(() => {
        const imgs = Array.from((bodyRef.value as HTMLElement).querySelectorAll('img'))
        imgs.forEach(async (elm) => {
          // 组合 elm 的 URL
          const srcAttribute = elm.getAttribute('src')
          console.log(currentBlog.url)
          if (
            currentBlog.url &&
            srcAttribute &&
            !/^(http|https):\/\//.test(srcAttribute) // 非相对路径的图片才需要进行处理
          ) {
            console.log(currentBlog.url, srcAttribute)
            const relativeUrl = decodeURIComponent(
              URIJS(currentBlog.dirUrl + '/' + srcAttribute)
                .absoluteTo('/')
                .toString()
            )

            const thisImgModuleKey = moduleKeys.find((key) => {
              const reg = new RegExp(relativeUrl)
              return reg.test(key)
            })
            if (!thisImgModuleKey) return
            const { default: imgResource } = await modules[thisImgModuleKey]()
            elm.setAttribute('src', imgResource)
          }
        })
      })
    })
    onBeforeMount(async () => {
      console.log('\n')
      console.log('directory', directory)

      directory.forEach(async (articleObj) => {
        const articleModuleKey = moduleKeys.find((key) => new RegExp(articleObj.url).test(key))
        if (!articleModuleKey) return
        const { default: article } = await modules[articleModuleKey]()
        console.log(article)
        allArticleBody.push(decodeURIComponent(window.atob(article.body as string)))
      })
      console.log('\n')
    })
    return {
      currentBlogBody,
      currentPage,
      bodyRef,
      loadAllContents
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
