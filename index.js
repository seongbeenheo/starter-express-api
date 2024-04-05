const express = require('express')
const ejs = require("ejs")
const bodyParser = require("body-parser")
const app = express()
const http = require("http")

const AWS = require("aws-sdk");
const s3 = new AWS.S3()

// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(express.static(__dirname + '/'))

const server = http.createServer(app)
app.set("view engine", "ejs")
app.set("views", "./views")


app.get('/', (req, res) => {
    res.render("test1", {
        param1: "11",
        param2: "1222"
    })
})

app.post("/send", async (req, res) => {
    try {
        // await s3.putObject({
        //     Body: JSON.stringify({ param1: req.body.param1, param2: req.body.param2 }),
        //     Bucket: "cyclic-funny-beret-ox-us-west-1",
        //     Key: "db.json",
        // }).promise()
        console.log("저장됨!")
        console.log(req.body)
        console.log(req.body.param1)
        console.log("=======")
        res.status(200).send(req.body)
    } catch (error) {
        res.status(404).send(error)
    }
})

app.listen(process.env.PORT || 3000, () => console.log(`${process.env.PORT || 3000}에서 실행 중...`))