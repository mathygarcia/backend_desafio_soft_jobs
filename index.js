const indexRoutes = require('./src/routes/indexRoutes')
/* require('dotenv').config() */

const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const port = 3000;

const app = express();

app.use(express.static('public'))
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', indexRoutes)
app.listen(port, (err) => console.error(err));