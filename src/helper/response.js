const successResponse = (data, message = 'success') => {
  const response = {
    status: 200,
    message,
    validation: {},
    data
  }

  return response
}

const errorResponse = (status, message, validationErrors = {}) => {
  const response = {
    status,
    message,
    validation: validationErrors,
    data: {}
  }

  return response
}

const errorValidation = (validationErrors = {}, message = 'failed') => {
  return errorResponse(404, message, validationErrors)
}

const paginateResponse = (
  data,
  message = 'success',
  page,
  limit,
  totalPage,
  totalRow
) => {
  const response = {
    status: 200,
    message,
    validation: {},
    data,
    page,
    limit,
    totalPage,
    totalRow
  }

  return response
}

module.exports = {
  errorResponse,
  successResponse,
  errorValidation,
  paginateResponse
}
