// Extending built in Error class in order to send status 400 instead of 500
class CustomAPIError extends Error {
  constructor(message) {
      super(message)
  }
}

export default CustomAPIError