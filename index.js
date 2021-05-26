const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const data = require('./data') // Acess our data.js file

app.set('view engine', 'ejs')

// Step 1
app.get('/', (req, res) => {
    // res.send('Welcome to our schedule website')

    res.render('pages/index', {
        documentTitle: 'Homepage',
        name: 'James Summergreene',
        day: "Wednesday",
        users: data.users
    })
})

app.get('/users', (req, res) => {
    console.log(data.users)
    res.send(data.users)
})

app.get('/schedules', (req, res) => {
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

app.post('/schedules', (req, res) => {
    res.send(req.body)
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