<template>
  <div class="wrapper">
    <header class="header"><slot name="header"></slot></header>
    <main class="main"><slot></slot></main>
    <aside class="asider"><slot name="asider"></slot></aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
  setup() {}
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/screenMixins.scss';
.wrapper {
  .header {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 0;
    overflow-y: auto;
    width: 16.66667%;
    min-width: 16.66667%;
    transition: .5s ease;
  }
  .asider {
    width: 21%;
    min-width: 21%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: auto;
    right: 0;
    display: block;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    transition: .5s ease;
  }
  .main {
    min-height: 100vh;
    padding: 15px;
    margin-left: 16.66667%;
    margin-right: 21%;
    word-break: break-all;
    white-space: normal;
    transition: .5s ease;
  }
  @include desktopLargeScreen {
  }
  @include desktopMediumScreen {
    .asider {
      width: 23%;
      min-width: 23%;
    }
    .main {
      margin-right: 23%;
    }
  }
  @include desktopSmallScreen {
    .asider {
      width: 25%;
      min-width: 25%;
    }
    .main {
      margin-right: 25%;
    }
  }
  @include desktopTinyScreen {
    .header {
      width: 4.16667%;
      min-width: 4.16667%;
      transition: .5s ease reverse;
    }
    .asider {
      width: 25%;
      min-width: 25%;
    }
    .main {
      margin-left: 4.16667%;
      margin-right: 25%;
    }
  }
  @include mobileScreen {
    .header {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: auto;
      height: 53px; // header 的默认高度
      width: 100%;
      z-index: 1050;
    }
    .asider {
      display: none;
    }
    .main {
      margin-left: 0;
      margin-right: 0;
      margin-top: 53px; // header 的默认高度
    }
  }
}
</style>
