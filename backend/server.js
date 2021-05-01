import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectionDB from './config/db.js'
import { notfound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
const app = express()

app.use(cors())

dotenv.config()

connectionDB()

app.get('/', (req, res) => {
  res.send('Health check ok')
})
app.use('/api/users', userRoutes)

// 404 not found
app.use(notfound)

//  Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running at ${PORT}`))
