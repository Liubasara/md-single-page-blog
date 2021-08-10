const dialogProps = {
  width: {
    type: Number,
    default: 540
  },
  // 弹窗距离浏览器上边界的距离
  top: {
    type: Number,
    default: 100
  },
  // 弹窗距离浏览器下边界的距离
  bottom: {
    type: Number,
    default: 100
  },
  customOnPopoverMaskClick: Function,
  customCloseFunc: Function
}

// export type DialogProps = Partial<
//   Overwrite<
//     releaseTypeToStateByDefault<typeof dialogProps>,
//     { customOnPopoverMaskClick?: Function; customCloseFunc?: Function }
//   >
// >

export default dialogProps
