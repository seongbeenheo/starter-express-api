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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
    let con = await animals.get("con")
    console.log(con)

    const time1 = timeToString(con.props.updated)
    const time2 = timeToString(con.props.updated)
    const time3 = timeToString(con.props.updated)
    const { temp1=10, temp2=20, temp3=30, use1=1, use2=0, use3=0 } = con.props

    res.render("test1", {
        temp1,
        temp2,
        temp3,
        time1,
        time2,
        time3,
        use1,
        use2,
        use3
    })
})

app.get("/test", async (req, res) => {
    const CyclicDb = require("@cyclic.sh/dynamodb")
    const db = CyclicDb("funny-beret-oxCyclicDB")
    const animals = db.collection("animals")
    let con = await animals.get("con")
    console.log(con)
    console.log("============")
    res.send(con)
})

app.post("/send", async (req, res) => {
    try {
        const { param1=10, param2=20, param3=30 } = req.body;

        const CyclicDb = require("@cyclic.sh/dynamodb")
        const db = CyclicDb("funny-beret-oxCyclicDB")
        const animals = db.collection("animals")
        let con = await animals.set("con", {
            temp1: param1,
            temp2: param2,
            temp3: param3,
            use1: 0,
            use2: 1,
            use3: 0
        })

        console.log("저장됨!")
        console.log("=======?====")
        res.status(200).send(req.body)
    } catch (error) {
        res.status(404).send(error)
    }
})

app.listen(process.env.PORT || 3000, () => console.log(`${process.env.PORT || 3000}에서 실행 중...`))