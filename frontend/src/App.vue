<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import directory from 'articleDist/directory/directory.json'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    onBeforeMount(async () => {
      console.log('\n')
      console.log('directory', directory)
      const { default: allContents } = await import('articleDist/allContents/allContents.json')
      console.log('allContents', allContents)

      // https://vitejs.dev/guide/features.html#glob-import vite 专有语法，打包固定文件
      const modules = import.meta.glob('/../article/dist/allArticle/**/*.*')
      const moduleKeys = Object.keys(modules)
      console.log(modules)
      directory.forEach(async <T extends { url: string }>(articleObj: T) => {
        const articleModuleKey = moduleKeys.find(key => new RegExp(articleObj.url).test(key))
        if (!articleModuleKey) return
        const { default: article } = await modules[articleModuleKey]()
        console.log(article)
      })
      console.log('\n')
    })
    
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
