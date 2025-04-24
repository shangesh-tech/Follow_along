const jwt = require('jsonwebtoken');
 const User = require('../model/user');
 const ErrorHandler = require('../utilities/ErrorHandler');
 const catchAsyncErrors = require('./catchAsyncErrors');
 
 const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
     const token = req.cookies.token;
     console.log("Token from cookies:", token);
 
     if (!token) {
         return next(new ErrorHandler("Please login to access this resource", 401));
     }
 
     let decodedData;
     try {
         decodedData = jwt.verify(token, "randomtoken1234567890");
         console.log("Decoded data:", decodedData);
     } catch (err) {
         
         console.error("JWT verification error:", err.name, err.message);
         return next(new ErrorHandler("Invalid or expired token", 401));
     }
 
     req.user = await User.findById(decodedData.id);
     if (!req.user) {
         return next(new ErrorHandler("User not found", 404));
     }
 
     next();
 });
 
 module.exports = { isAuthenticatedUser };