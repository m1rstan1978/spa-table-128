const express = require('express')
const cors = require('cors')
const data = require('./data.json')
const app = express()

app.use(cors())

app.get('/user',(req,res) => {
    res.json(data)
})

app.listen(3030,() => {
    console.log('Server started on port 3030')
})