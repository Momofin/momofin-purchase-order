const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Jakarta')

module.exports = {
  nowUTC: () => {
    return dayjs.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
  },
  nowLocaleDatetime: () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  convertToDatetime: (format) => {
    return dayjs(format).format('YYYY-MM-DD HH:mm:ss')
  }
}
