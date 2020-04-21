const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');

dotenv.config();

// url 인코딩이란 문자나 공백 특수문자를 %ED%97%AC%EB%A1%9C%EC%9A%B0+WORLD 처럼 바꿔 주는것
// 파싱이란 <h1>1</h1> <img> 처럼 마크업 된 일렬의 문자열 데이터를 구문 분석하여 문장 구조를 해석 하는것

// urlencoded는 request에 오는 헤더에 달린 content-type을 보고 인코딩된(encoded, %EDfldkfj) url 구문을 해석하는 행위
app.use(bodyParser.urlencoded({ extended: true }));

// json은 request에 오는 헤더에 달린 content-type을 보고 json을 해석하는 행위
app.use(bodyParser.json());


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('mongoDB Connected'))
    .catch(e => console.log(e))


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => console.log(`node server is listening ${port}`));