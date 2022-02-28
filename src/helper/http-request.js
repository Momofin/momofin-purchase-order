const axios = require('axios').default
const { Env } = require('../config/env-loader')
const { COMPANY_API } = Env()

async function request (method, path, dto, params = '', authorize) {
  try {
    const data = (await axios({
      headers: { authorization: authorize },
      params: params,
      method,
      url: COMPANY_API + path,
      data: dto
    })).data
    return data
  } catch (error) {
    return error.response.data
  }
}

module.exports = { request }