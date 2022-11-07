import express from 'express'
import { json } from 'body-parser'

const app = express()
app.use(json())

app.get('/api/users/currentuser', (req, res) => {
  console.log('Get current user')

  res.send('Hello biiitch')
})

app.listen(3000, () => {
  console.log('v20')
  console.log('Listening on port 3000')
})
