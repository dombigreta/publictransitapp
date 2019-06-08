require('dotenv/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
    console.log(` app listens on ${process.env.PORT}`);
});