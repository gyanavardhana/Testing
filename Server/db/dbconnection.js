const express = require('express');
const mongoose = require('mongoose');
console.log(process.env.MONGOURL);
try {
    mongoose.connect(process.env.MONGOURL, {})
        .then(() => console.log("Database Connected"));
}
catch (err) {
    console.log(err);
    console.log("some error in connecting to database");
}