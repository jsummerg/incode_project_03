const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const data = require('./data')

app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
    console.log(data.users)
    res.send(data.users)
})

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
    res.send(data.schedules)
})




// app.get('/users/:id/schedules', (req, res) => {
//     res.send(data.user.params.schedules)
// })

// app.get ('/users/1/schedules', (req, res) => {
//     res.send('Hello')
// })

// app.get('/users/:name/:email', (req, res) => {
//     res.send(req.params)
// })

// app.get('/users/:query', (req, res) => {
//     res.send()
//     req.query()
// })


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

// for each