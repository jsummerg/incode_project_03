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




app.get('/users/:id/schedules', (req, res) => { // TODO: Change id param to only digits
    const id = Number(req.params.id)
    let schedules = []
    for (let i = 0; i < data.schedules.length; i++) {
        const currentSchedules = data.schedules[i]
        if (currentSchedules.user_id === id) {
            schedules.push(currentSchedules)
        }
    }
    res.send(schedules)
})



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