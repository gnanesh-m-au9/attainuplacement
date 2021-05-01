import express from 'express'
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Health check ok')
})

app.listen(port, (err) => {
  if (err) throw err
  console.log(`Server is running at port : ${port}`)
})
