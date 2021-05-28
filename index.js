// Step 1
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const data = require('./data') // Acess our data.js file
app.set('view engine', 'ejs')

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})


// Password encryption
const bcrypt = require('bcrypt')
const saltRounds = 10


// Step 2
app.get('/', (req, res) => {
    res.render('pages/index', {
        documentTitle: 'Homepage',
        name: 'James Summergreene',
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


// Step 3
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    if (data.users[id]) {
        res.send(data.users[id])
    }
    else {
        res.send("User not found")
    }
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


// Step 4
app.post('/users', (req, res) => {
    const plainPassword = req.body.password
    const hash = bcrypt.hashSync(plainPassword, saltRounds) // encrypts password
    req.body.password = hash // changes the password in the request to it's hashed version
    data.users.push(req.body) // Inputs the info into the database
    res.send(req.body) //sends the user info with the hashed password to the database
})

// #TODO: look into for each