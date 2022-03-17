const axios = require('axios').default

async function request (method, path, dto, params = '', authorize) {
  try {
    const data = (await axios({
      headers: { Authorization: authorize },
      params: params,
      method,
      url: path,
      data: dto
    })).data
    return data
  } catch (error) {
    return error.response
  }
}

module.exports = { request }
