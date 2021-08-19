export {}
import type { ExtractPropTypes, ComponentOptions } from 'vue'
declare global {
  type getSetupTypeByProps<PropType> = Exclude<
    ComponentOptions<ExtractPropTypes<PropType>>['setup'],
    undefined
  >
  type releaseProsAndContextTypeFromSetupType<T> = T extends (
    a: infer V,
    b: infer U
  ) => any
    ? [V, U]
    : any
  type getSetupParamsType<PropType> = releaseProsAndContextTypeFromSetupType<
    getSetupTypeByProps<PropType>
  >
  type setupPropsType<PropType> = getSetupParamsType<PropType>[0]

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
