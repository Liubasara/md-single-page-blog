<template>
  <div class="asider-container">
    <ListCard
      title="标签"
      v-model:is-list-expand="tag.tagCard.isListExpand"
      :show-list-expand-btn="tag.tagCard.showListExpandBtn"
    >
      <ListItem
        v-for="(item, index) in tag.allTags"
        :key="index"
        :is-active="isTagActive(item)"
        @item-click="tagClick(item)"
        :name="item"
        :num="tag.tagsMap[item].num"
      ></ListItem>
    </ListCard>

    <ListCard
      title="分类"
      v-model:is-list-expand="cate.cateCard.isListExpand"
      :show-list-expand-btn="cate.cateCard.showListExpandBtn"
    >
      <ListItem
        v-for="(item, index) in cate.allCates"
        :key="index"
        :is-active="isCateActive(item)"
        @item-click="cateClick(item)"
        :name="item"
        :num="cate.catesMap[item].num"
      ></ListItem>
    </ListCard>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRef, toRefs } from 'vue'
import AsiderProps from '@/components/asider/props'
import Collapse from '@/components/collapse/Index.vue'
import ListCard from '@/components/asider/components/listCard/Index.vue'
import ListItem from '@/components/asider/components/listItem/Index.vue'
import type { Ref } from 'vue'

const LIMIT_COLLAPSE_NUM = 10

function useListCard(datas: Ref<string[]>) {
  const showListExpandBtn = computed(() => datas.value.length > LIMIT_COLLAPSE_NUM)
  const isListExpand = ref(!showListExpandBtn.value)
  const expandTagList = () => {
    isListExpand.value = !isListExpand.value
  }
  return reactive({
    showListExpandBtn,
    isListExpand,
    expandTagList
  })
}

function useTags(props: setupPropsType<typeof AsiderProps>) {
  const { allTags, tagsMap } = toRefs(toRef(props, 'tags').value)
  const { tagClick, isTagActive } = props
  const tagCard = useListCard(allTags)
  return reactive({
    tagClick,
    allTags,
    tagsMap,
    isTagActive,
    tagCard,
  })
}

function useCates(props: setupPropsType<typeof AsiderProps>) {
  const { allCates, catesMap } = toRefs(toRef(props, 'cates').value)
  const { cateClick, isCateActive } = props
  const cateCard = useListCard(allCates)
  return reactive({
    cateClick,
    allCates,
    catesMap,
    isCateActive,
    cateCard
  })
}

// TODO: 组件逻辑待重构（添加 Asider-item）, 并添加 归档
export default defineComponent({
  name: 'Asider',
  props: AsiderProps,
  components: {
    Collapse,
    ListCard,
    ListItem
  },
  setup(props) {
    const tag = useTags(props)
    const cate = useCates(props)

    return {
      // tag
      tag,
      // cate
      cate
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
