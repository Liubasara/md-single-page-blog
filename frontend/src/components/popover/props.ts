const dialogProps = {
  width: {
    type: Number,
    default: 540
  },
  height: {
    type: Number,
    default: 380
  },
  customOnPopoverMaskClick: Function
}

export type DialogProps = releaseTypeToStateByDefault<typeof dialogProps>

export default dialogProps