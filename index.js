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
    res.send(data.users)
})

app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})


// Step 3
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send(data.users[id] ? data.users[id] : "User not found")
})

app.get('/users/:id/schedules', (req, res) => { // TODO: Change id param to only digits
    const id = Number(req.params.id)
    let newSchedules = [] 
    data.schedules.forEach (schedule => { // replaces the for loop to check through each element, schedule knows which value its on
        if (schedule.user_id === id){
            newSchedules.push(schedule)
        }
    })
    res.send(newSchedules.length ? newSchedules : 'User has no schedules booked') // conditional ternary operator, can replace else if statements that use the same operator in the outcome Eg: res.send
})


// Step 4
app.post('/users', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, saltRounds) // encrypts password
    req.body.password = hash // changes the password in the request to it's hashed version
    data.users.push(req.body) // Inputs the info into the database
    res.send(req.body) //sends the user info with the hashed password to the database
})

app.post('/schedules', (req, res) => {
    req.body.user_id = Number(req.body.user_id)
    req.body.day = Number(req.body.day)
    data.schedules.push(req.body) // Inputs the schedule info into the database
    res.send(req.body) // sends the user schedule info
})

// #TODO: look into for each

// curl -d "user_id=1&day=2&start_at=9AM&end_at=2PM" -X POST localhost:3000/schedules