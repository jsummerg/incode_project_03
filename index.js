var express = require('express')
var app = express()
const port = 3000
const data = require('./data.js')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    console.log(data)
    console.log(data.users)
    res.send('Nice Job James!')
})

app.get('/test/:id', (req, res) => {
    res.send(req.params.id)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })