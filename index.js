const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.post("/send", (req, res) => {
    console.log(req.body)
    res.status(200).send(req.body)
})

app.listen(process.env.PORT || 3000)