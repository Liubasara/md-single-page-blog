import { reactive, nextTick, ref, computed, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import HeaderProps from '@/components/header/props'
import { useSearchInSetup } from '@/components/search/index'
// import type { SetupContext } from 'vue'

type HeaderSetupPropsType = setupPropsType<typeof HeaderProps>
// type HeaderSetupContextType = SetupContext<Array<string>>
// type HeaderSetupContextType = SetupContext<['headerMounted']>

export const useHeaderBasicInSetup = (
  props: HeaderSetupPropsType
  // context?: HeaderSetupContextType
) => {
  // const { emit } = context || {}
  // onMounted(() => {
  //   emit?.('headerMounted')
  // })
  const { handleSearchClick } = useSearchInSetup()
  const { headerRoutes: headerRoutesRef } = toRefs(props)
  return {
    handleSearchClick,
    headerRoutesRef
  }
}

export const useCommonPcHeaderInSetup = (props: HeaderSetupPropsType) => {
  const basicAction = useHeaderBasicInSetup(props)
  return {
    ...basicAction,
    props
  }
}

export const useTinyPcHeaderInSetup = (props: HeaderSetupPropsType) => {
  const basicAction = useHeaderBasicInSetup(props)
  const { headerRoutesRef } = basicAction
  const router = useRouter()
  const { handleSearchClick } = basicAction
  const icons = reactive(
    headerRoutesRef.value.map((item) => ({
      type: item.iconType,
      action: (() => router.push(item.routerParams)) as (...args: any[]) => any
    }))
  )
  icons.splice(1, 0, {
    type: 'search',
    action: ($evt: Event) => {
      handleSearchClick($evt)
    }
  })
  return {
    ...basicAction,
    icons
  }
}

export const useMobileHeaderInSetup = (props: HeaderSetupPropsType) => {
  const basicAction = useHeaderBasicInSetup(props)
  const menuNavBar = useMenuNavbar()
  const router = useRouter()
  const routerPush = (path: string) => {
    router.push(path)
    nextTick(() => {
      menuNavBar.isExpandMenu.value = false
    })
  }
  return {
    ...basicAction,
    ...menuNavBar,
    routerPush
  }
}

function useMenuNavbar() {
  const isExpandMenu = ref(false)
  const closeMenu = () => {
    isExpandMenu.value = false
  }
  const expandMenu = () => {
    isExpandMenu.value = true
  }
  const menuClick = () => {
    isExpandMenu.value = !isExpandMenu.value
  }
  const navBarClasses = reactive({
    collapsing: true,
    'navbar-wrapper': true,
    'navbar-container-in': computed(() => !isExpandMenu.value),
    'navbar-container-out': computed(() => isExpandMenu.value)
  })

  const navbarContainer = ref<HTMLDivElement>()
  const navbarContainerHeight = ref('0px')
  const resizeObserver = new ResizeObserver(() => {
    navbarContainerHeight.value = navbarContainer.value
      ? getComputedStyle(navbarContainer.value).height
      : '0px'
  })
  onMounted(() => {
    resizeObserver.observe(navbarContainer.value as HTMLDivElement)
  })

  return {
    isExpandMenu,
    navbarContainer,
    navBarClasses,
    navbarContainerHeight,
    menuClick,
    closeMenu,
    expandMenu
  }
}
