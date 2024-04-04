const express = require('express')
const ejs = require("ejs")
const bodyParser = require("body-parser")
const app = express()
const http = require("http")

// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(express.static(__dirname + '/'))

const server = http.createServer(app)
app.set("view engine", "ejs")
app.set("views", "./views")


app.get('/', (req, res) => {
    res.render("test1", {
        one: "this is one"
    })
})

app.post("/send", (req, res) => {
    console.log(req.body)
    res.render("test1", {
        param1: req.body.param1,
        param2: req.body.param2
    })
    res.status(200).send(req.body)
})

app.listen(process.env.PORT || 3000, ()=>console.log(`${process.env.PORT || 3000}에서 실행 중...`))