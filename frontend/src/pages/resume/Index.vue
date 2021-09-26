<template>
  <div v-html="resumeHtml"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

async function fetchResumeFile() {
  let resumeTpl = ''
  try {
    const objs = await import.meta.glob('./resume.html.tpl')
    const getResumeFn = objs['./resume.html.tpl']
    if (!!getResumeFn) {
      resumeTpl = decodeURIComponent(window.atob((await getResumeFn()).default))
    }
    // resumeTpl = decodeURIComponent(window.atob((await import('./resume.tpl.html')).default))
  } catch (e) {
    //
    console.error(e)
  }
  return resumeTpl
}

export default defineComponent({
  name: 'ResumePage',
  setup() {
    const router = useRouter()
    let resumeHtml = ref('')
    onBeforeMount(async () => {
      resumeHtml.value = await fetchResumeFile()
      if (!resumeHtml.value) {
        router.replace({ name: 'BlogHome' })
      }
    })
    return {
      resumeHtml
    }
  },
})
</script>

