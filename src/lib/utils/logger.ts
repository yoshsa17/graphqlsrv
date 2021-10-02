import pino from 'pino'
import dayjs from 'dayjs'

const logger = pino({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => {
    return `,"time":"${dayjs().format()}"`
  },
})

export default logger
