<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <button @click="currentPage += 1">下一章</button>
  <div v-html="currentBlogBody" style="height: 200px;"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch, reactive } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import directory from 'articleDist/directory/directory.json'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const currentPage = ref(0)
    const allArticleBody:Array<string> = reactive([])
    let currentBlogBody = ref('')
    watch([allArticleBody, currentPage], (newVal, prevVal) => {
      const [newAllArticleBodyVal, newCurrentPageVal] = newVal
      let currentBlogBodyVal = newAllArticleBodyVal[newCurrentPageVal]
      if (!currentBlogBodyVal) {
        currentPage.value = 0
      } else {
        currentBlogBody.value = currentBlogBodyVal
      }
    })
    onBeforeMount(async () => {
      console.log('\n')
      console.log('directory', directory)
      const { default: allContents } = await import('articleDist/allContents/allContents.json')
      console.log('allContents', allContents)

      // https://vitejs.dev/guide/features.html#glob-import vite 专有语法，打包固定文件
      const modules = import.meta.glob('/../article/dist/allArticle/**/*.*')
      const moduleKeys = Object.keys(modules)
      console.log(modules)
      directory.forEach(async <T extends { url: string }>(articleObj: T, index: number) => {
        const articleModuleKey = moduleKeys.find(key => new RegExp(articleObj.url).test(key))
        if (!articleModuleKey) return
        const { default: article } = await modules[articleModuleKey]()
        console.log(article)
        allArticleBody.push(decodeURIComponent(window.atob(article.body as string)))
      })
      console.log('\n')
    })
    return {
      currentBlogBody,
      currentPage
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
