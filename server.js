import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import morgan from 'morgan'
import authenticateUser from './middleware/auth.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import 'express-async-errors'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
})

app.get('/api/v1', (req, res) => {
    res.json({msg: 'API'})
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


dotenv.config()

const port = process.env.PORT || 5000 


const start = async () => {
    try {
     await connectDB(process.env.MONGO_URL)
     app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`)
     })
    } catch (error) {
        console.log(error);
    }
}

start()