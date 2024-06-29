const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

const routes = require('./routes/user.js');
app.use('/api/v1', routes);


const { dbConnect } = require('./config/database.js');
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});