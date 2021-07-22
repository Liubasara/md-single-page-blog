function performanceTest<T extends (...args: Array<any>) => any>(fn: T) {
  type fnArguments<F extends (...args: Array<any>) => any> = F extends (
    ...args: infer V
  ) => any
    ? V
    : any
  type fnReturn = ReturnType<T>
  return function (this: any, ...args: fnArguments<T>): fnReturn {
    const t0 = performance.now()
    const result = fn.apply(this, args)
    const t1 = performance.now()
    console.log(
      '函数名称:',
      fn.name,
      '执行耗时',
      (t1 - t0).toFixed(4),
      '毫秒:',
      result
    )
    return result
  }
}

export default performanceTest
