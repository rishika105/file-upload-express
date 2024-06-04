const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String, 
    },
    videoUrl:{
        type: String, 
    },
    tags:{
        type: String,
    },
    email:{
        type: String,
    },
});

//post middleware
fileSchema.post("save", async function(doc){
    try{
     console.log("DOC", doc)

     //transporter
     //should be in config folder
     let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
     });

     //send mail
     let info = await transporter.sendMail({
        from: `Codehelp- by Babbar Bhaiya`,
        to: doc.email,
        subject: "New File Uploaded Successfully",
        html: `<h1>Hello Guys</h1> <p>File Uploaded View here: <a href= "${doc.imageUrl}">${doc.imageUrl}</a> </p>`
     });
     
     console.log(info);

    }
    catch(error){
        console.error(error);
    }
})

module.exports = mongoose.model("File", fileSchema);