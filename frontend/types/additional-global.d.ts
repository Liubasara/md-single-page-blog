export {}
import type { SetupContext, ExtractPropTypes } from 'vue'
declare global {
  type setupContextType = SetupContext<Record<string, any>>
  type setupPropsType<T> = Readonly<
    LooseRequired<Readonly<ExtractPropTypes<T>>>
  >
  // type typeOrRef<T> = T | Ref<T> | ComputedRef<T>

  /**
   * 根据 Props 定义的 defaults 来推断其属性生成输入 props 的对应类型
   */
  // type releaseTypeToStateByDefault<
  //   T extends { [key: string]: { type: any; default?: any } | any }
  // > = Partial<
  //   {
  //     [P in keyof T]: T[P] extends {
  //       type: any
  //       default: any
  //       [key: string]: any
  //     }
  //       ? T[P]['default'] extends (...args: Array<any>) => infer V
  //         ? V extends Array<infer K>
  //           ? typeOrRef<Array<K>>
  //           : V extends { [D in keyof V]: V[D] }
  //           ? typeOrRef<{ [D in keyof V]: V[D] }>
  //           : typeOrRef<T[P]['default']>
  //         : typeOrRef<T[P]['default']>
  //       : T[P] extends { type: any; [key: string]: any }
  //       ? ReturnType<T[P]['type']>
  //       : ReturnType<T[P]>
  //   }
  // >
}
