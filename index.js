const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

app.use(bodyParser.json());
const Router = require('./Routes/Router');
app.use('/', Router);
app.use('/images', express.static('uploads/photos'))

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB database is connected and live...!")
    })
    .catch(() => {
        console.log("Server Error")
    });

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
});