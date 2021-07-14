/**
 * 判断是否移动端,根据ua或屏幕宽度判断
 * @returns {boolean} true/false
 */
const isMobile = () => {
  if (
    /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ||
    window.screen.width <= 768
  ) {
    return true
  }
  return false
}

export default isMobile
