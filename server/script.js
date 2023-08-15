const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

// app created from express
const app = express();

app.use(express.json());

// PORT from .env
const PORT = process.env.PORT || 5500


// use cors config
app.use(cors());

// router import
const todoItemRouter = require('./routes/todoItems');



// connection db
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log(`Database connected from env`))
.catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`Server connected from ${PORT}`))
app.use('/',todoItemRouter);



