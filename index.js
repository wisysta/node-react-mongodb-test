const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(`mongodb+srv://wisysta:${process.env.MONGO_DB_PASSWORD}@node-react-oiru3.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongodb connected')).catch(e => console.log(e))

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`node server is listening ${port}`));