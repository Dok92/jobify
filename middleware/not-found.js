// import { StatusCodes } from 'http-status-codes'
// import CustomAPIError from './custom-api.js'

// class NotFoundError extends CustomAPIError {
//   constructor(message) {
//     super(message)
//     this.statusCode = StatusCodes.NOT_FOUND
//   }
// }

// export default NotFoundError

const notFoundMiddleware = (req, res) => res.status(404).send('Invalid route')

export default notFoundMiddleware   