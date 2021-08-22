function dateFormatHelper(time: string | number | Date) {
  if (time instanceof Date) return time
  return new Date(time)
}

/**
 * 获取当月最后一天
 * @param curDate
 * @returns
 */
export function getLastDateOfMonth(curDate: string | number | Date) {
  const endDate = dateFormatHelper(curDate)
  const currentMonth = endDate.getMonth()
  const nextMonth = currentMonth + 1
  const nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1)
  const oneDay = 1000 * 60 * 60 * 24
  const lastTime = new Date(+nextMonthFirstDay - oneDay)
  // let endMonth: string | number = parseInt(lastTime.getMonth() + 1 + '')
  // let endDay: string | number = lastTime.getDate()
  // if (endMonth < 10) {
  //   endMonth = '0' + endMonth
  // }
  // if (endDay < 10) {
  //   endDay = '0' + endDay
  // }
  // //格式：2020-12-30
  // console.log(endDate.getFullYear() + '-' + endMonth + '-' + endDay)
  return lastTime
}

/**
 * 获取当月第一天
 * @param curDate
 * @returns
 */
export function getFirstDateOfMonth(curDate: string | number | Date) {
  const endDate = dateFormatHelper(curDate)
  const currentMonth = endDate.getMonth()
  const currentMonthFirstDay = new Date(endDate.getFullYear(), currentMonth, 1)
  return currentMonthFirstDay
}

/**
 * 获取下个月的第一天
 * @param curDate
 * @returns
 */
export function getFirstDateOfNextMonth(curDate: string | number | Date) {
  const endDate = dateFormatHelper(curDate)
  const currentMonth = endDate.getMonth()
  const nextMonth = currentMonth + 1
  const nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1)
  return nextMonthFirstDay
}

/**
 * 获取当月的时间间隔
 * @param curDate
 */
export function getIntervalByMonth(curDate: string | number | Date) {
  const endDate = dateFormatHelper(curDate)
  return +getLastDateOfMonth(endDate) - +getFirstDateOfMonth(endDate)
}

export function getFirstDateOfNextYear(curDate: string | number | Date) {
  const endDate = dateFormatHelper(curDate)
  const nextYearFirstDay = new Date(endDate.getFullYear() + 1, 0, 1)
  return nextYearFirstDay
}

export type splitType = 'day' | 'month' | 'year'
export function getTimeSnapsByType(
  _minTime: string | number | Date,
  _maxTime: string | number | Date,
  type: splitType = 'month'
) {
  const minTime = dateFormatHelper(_minTime)
  const maxTime = dateFormatHelper(_maxTime)
  const snaps: Array<Date> = []
  const handlerMaps: {
    [key in splitType]: Function
  } = {
    month() {
      snaps.push(getFirstDateOfMonth(minTime))
      let tmpDate = getFirstDateOfNextMonth(snaps.slice(-1)[0])
      while (+maxTime > +tmpDate) {
        snaps.push(tmpDate)
        tmpDate = getFirstDateOfNextMonth(snaps.slice(-1)[0])
      }
    },
    day() {
      const oneDay = 1000 * 60 * 60 * 24
      snaps.push(
        new Date(minTime.getFullYear(), minTime.getMonth(), minTime.getDate())
      )
      let tmpDate = new Date(+snaps.slice(-1)[0] + oneDay)
      while (+maxTime > +tmpDate) {
        snaps.push(tmpDate)
        tmpDate = new Date(+snaps.slice(-1)[0] + oneDay)
      }
    },
    year() {
      snaps.push(new Date(minTime.getFullYear(), minTime.getMonth()))
      let tmpDate = getFirstDateOfNextYear(+snaps.slice(-1)[0])
      while (+maxTime > +tmpDate) {
        snaps.push(tmpDate)
        tmpDate = getFirstDateOfNextYear(+snaps.slice(-1)[0])
      }
    }
  }
  handlerMaps[type]()
  return snaps
}

export function formatTimeToStringByType(
  dt: string | number | Date,
  type: splitType = 'month'
) {
  const time = dateFormatHelper(dt)
  enum month {
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二'
  }
  const handlerMaps = {
    day: () => time.getFullYear() + '/' + month[time.getMonth()] + '/' + time.getDate(),
    month: () => time.getFullYear() + ' ' + month[time.getMonth()],
    year: () => time.getFullYear()
  }
  return handlerMaps[type]()
}
