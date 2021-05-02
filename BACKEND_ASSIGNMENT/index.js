import express from 'express'
import dotenv from 'dotenv'
import connectionDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

dotenv.config()
connectionDB()

app.get('/', (req, res) => {
  res.send('Health check ok')
})

app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running at ${PORT}`))
