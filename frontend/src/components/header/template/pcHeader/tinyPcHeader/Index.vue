<template>
  <div class="header-container clearfix-bfc">
    <div class="avatar-container">
      <router-link class="avatar-link" :to="{ path: '/' }">
        <img src="@/assets/img/avatar.jpeg" alt="avatar" />
      </router-link>
    </div>
    <div class="menu">
      <div class="clearfix-bfc" v-for="(item, index) in icons" :key="index">
        <div class="menu-item" @click="item.action($event)">
          <Icon :type="item.type"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/icon/Index.vue'
import { useTinyPcHeaderInSetup } from '@/components/header/logic/index'
import headerProps from '@/components/header/props'

export default defineComponent({
  name: 'TinyPcHeader',
  components: {
    Icon
  },
  props: headerProps,
  setup: useTinyPcHeaderInSetup
})
</script>

<style lang="scss" scoped>
.clearfix-bfc {
  &::before {
    content: "";
    display: table;
  }
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fbfbfb;
  border-right: 1px solid #f6f6f6;
}
.avatar-container {
  margin: 10px 0;
  display: block;
  width: 32px;
  height: 32px;
  transition: 0.3s ease;
  img {
    padding: 5px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &:hover {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
  }
}
.menu {
  width: 100%;
  text-align: center;
  .menu-item {
    width: 100%;
    padding: 10px 0;
    color: rgb(85, 85, 85);
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>

