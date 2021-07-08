function idle <T extends Function>(fn: T): void {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(fn)
  } else {
    setTimeout(fn)
  }
}

export default idle