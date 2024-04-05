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

function timeToString(t) {
    const isoDateString = t; // 변환할 ISO 8601 형식의 날짜와 시간

    // ISO 8601 형식의 문자열을 Date 객체로 변환
    const date = new Date(isoDateString);

    // 사람이 이해하기 쉬운 형식으로 날짜와 시간 변환
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 변환
    const day = date.getDate().toString().padStart(2, '0'); // 일, 두 자리로 변환
    const hours = date.getHours().toString().padStart(2, '0'); // 시, 두 자리로 변환
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분, 두 자리로 변환
    const seconds = date.getSeconds().toString().padStart(2, '0'); // 초, 두 자리로 변환

    // 변환된 형식으로 날짜와 시간 출력
    const formattedDate = `${year}년 ${month}월 ${day}일`;
    const formattedTime = `${hours}시 ${minutes}분 ${seconds}초`;

    console.log(`${formattedDate} ${formattedTime}`);
    return `${formattedDate} ${formattedTime}`;
}

const server = http.createServer(app)
app.set("view engine", "ejs")
app.set("views", "./views")


app.get('/', async (req, res) => {
    const CyclicDb = require("@cyclic.sh/dynamodb")
    const db = CyclicDb("funny-beret-oxCyclicDB")
    const animals = db.collection("animals")
    let item = await animals.get("leo")
    console.log(item)

    const time1 = timeToString(item.props.updated)

    res.render("test1", {
        param1: "11",
        param2: "1222",
        time1
    })
})

app.get("/test", async (req, res) => {
    const CyclicDb = require("@cyclic.sh/dynamodb")
    const db = CyclicDb("funny-beret-oxCyclicDB")
    const animals = db.collection("animals")
    let con1 = await animals.get("con1")
    let con2 = await animals.get("con2")
    console.log(con1, con2)

    console.log("============")
    res.send(con1, con2)
})

app.post("/send", async (req, res) => {
    try {
        const CyclicDb = require("@cyclic.sh/dynamodb")
        const db = CyclicDb("funny-beret-oxCyclicDB")
        const animals = db.collection("animals")
        let con1 = await animals.set("con1", {
            temp: "12",
            use: 1
        })
        // let con2 = await animals.set("con2", {
        //     temp: "1221",
        //     use: 0
        // })

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