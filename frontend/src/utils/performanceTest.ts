function performanceTest<T extends Function>(fn: T) {
  return function (this: any, ...args: any[]) {
    const t0 = performance.now()
    const result = fn.apply(this, args)
    const t1 = performance.now()
    console.log('函数名称:', fn.name, '执行耗时', (t1 - t0).toFixed(4), '毫秒:', result)
  }
}

export default performanceTest
