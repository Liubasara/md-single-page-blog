<template>
  <div class="asider-container">
    <div class="clearfix-bfc">
      <h3 class="title">标签</h3>
      <ul class="tag-list">
        <Collapse :is-expand="isTagListExpand" :min-height="45">
          <li class="tag-list-item" v-for="(item, index) in allTags" :key="index">
            <a
              :class="['tag-list-link', { active: isTagActive(item) }]"
              @click.prevent.stop="tagClick(item)"
            >
              {{
                item
              }}
            </a>
            <span class="tag-list-count">{{ tagsMap[item].num }}</span>
          </li>
        </Collapse>
        <li>
          <span
            v-if="showTagListExpandBtn"
            class="tag-list-link active"
            @click="expandTagList"
          >{{ tagListExpandText }}</span>
        </li>
      </ul>
    </div>

    <div class="clearfix-bfc">
      <h3 class="title">分类</h3>
      <ul class="cate-list">
        <Collapse :is-expand="isCateListExpand" :min-height="45">
          <li class="cate-list-item" v-for="(item, index) in allCates" :key="index">
            <a
              :class="['cate-list-link', { active: isCateActive(item) }]"
              @click.prevent.stop="cateClick(item)"
            >
              {{
                item
              }}
            </a>
            <span class="cate-list-count">{{ catesMap[item].num }}</span>
          </li>
        </Collapse>
        <li>
          <span
            v-if="showCateListExpandBtn"
            class="cate-list-link active"
            @click="expandCateList"
          >{{ cateListExpandText }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef, toRefs } from 'vue'
import AsiderProps from '@/components/asider/props'
import Collapse from '@/components/collapse/Index.vue'

const LIMIT_COLLAPSE_NUM = 10

// TODO: 组件逻辑待重构（添加 Asider-item）, 并添加 归档
export default defineComponent({
  name: 'Asider',
  props: AsiderProps,
  components: {
    Collapse
  },
  setup(props) {
    const { allTags, tagsMap } = toRefs(toRef(props, 'tags').value)
    const { allCates, catesMap } = toRefs(toRef(props, 'cates').value)
    const { tagClick, cateClick, isTagActive, isCateActive } = props

    const showTagListExpandBtn = computed(() => allTags.value.length > LIMIT_COLLAPSE_NUM)
    const isTagListExpand = ref(!showTagListExpandBtn.value)
    const expandTagList = () => {
      isTagListExpand.value = !isTagListExpand.value
    }
    const tagListExpandText = computed(() => isTagListExpand.value ? '收缩' : '展开')

    const showCateListExpandBtn = computed(() => allCates.value.length > LIMIT_COLLAPSE_NUM)
    const isCateListExpand = ref(!showCateListExpandBtn.value)
    const expandCateList = () => {
      isCateListExpand.value = !isCateListExpand.value
    }
    const cateListExpandText = computed(() => isCateListExpand.value ? '收缩' : '展开')

    return {
      // tag
      tagClick,
      allTags,
      tagsMap,
      isTagActive,
      isTagListExpand,
      expandTagList,
      tagListExpandText,
      showTagListExpandBtn,
      // cate
      cateClick,
      allCates,
      catesMap,
      isCateActive,
      isCateListExpand,
      expandCateList,
      cateListExpandText,
      showCateListExpandBtn
    }
  }
})
</script>

<style lang="scss" scoped>
.asider-container {
  height: 100%;
  padding: 20px 30px;
}
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
.title {
  font-size: 18px;
  color: #000;
  margin-top: 21px;
  margin-bottom: 10.5px;
  font-weight: 500;
}
.tag-list,
.cate-list {
  margin-bottom: 10.5px;
  line-height: 1.75;
  font-size: 14px;
}
.tag-list-item,
.cate-list-item {
  user-select: none;
  &::before {
    box-sizing: border-box;
    color: #ccc;
    content: "▪";
    font-size: 12px;
    margin-right: 6px;
    -webkit-transition: 0.2s ease;
    transition: 0.2s ease;
  }
}
.tag-list-link,
.cate-list-link {
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #2196f3;
  }
  &.active {
    color: #0073ce;
  }
}
.tag-list-count,
.cate-list-count {
  padding-left: 5px;
  color: #999;
  font-size: 0.85em;
  &::before {
    content: "(";
  }
  &::after {
    content: ")";
  }
}
</style>
