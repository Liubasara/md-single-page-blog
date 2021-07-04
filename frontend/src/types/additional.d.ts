declare interface Window {
  requestIdleCallback: <T extends Function>(callback: T, options?: object) => {}
}
