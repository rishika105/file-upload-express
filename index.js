//app create
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

//PORT 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//use middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//db connection
const db = require("./config/database");
db.connect();

//cloud connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, ()=>{
    console.log(`App is running successfully at ${PORT}`)
})