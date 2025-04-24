const express = require("express");
const app = express(); 
const ErrorHandler = require("./middlewares/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const product= require('./controllers/product.controller')
const path=require('path')
const orders = require('./controllers/ordercontroller');

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
  };


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env",
    });
};
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));
const user = require("./controllers/user.controller");
app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
app.use("/api/v2/orders", orders);
app.use(ErrorHandler);
module.exports= app;