import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 300
app.get('/', (req, res) => {
  res.send('Hello word')
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
