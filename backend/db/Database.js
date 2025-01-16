require("dotenv").config()
    

const mongoose = require('mongoose')
const connectDatabase = ()=>{

    mongoose
    .connect(process.env.DB_URL)
    .then((data=>{
        console.log(`DB connected successfully:${data.connection.host}`);
    }))
    .catch((err)=>console.log("DB connection failed..",err.message))
};

module.exports = connectDatabase


