const now = require('nano-time')

const generateCode = async () => {
  const nanoTime = now()
  const code = Math.random().toString(20).substr(2, 6).toUpperCase() + nanoTime
  return code
}

module.exports = (generateCode)