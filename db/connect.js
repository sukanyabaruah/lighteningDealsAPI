const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url).then(() => console.log("Database connected")).catch((error) => console.log(error));
};

module.exports = connectDB;