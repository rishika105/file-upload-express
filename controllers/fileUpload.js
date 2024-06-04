const File = require("../models/File");
const cloudinary = require("cloudinary").v2

//localfileUpload -> handler function

exports.localFileUpload = async(req, res) =>{
    try{
     
        //fetch file from this heirarchy files.file where file is used as key
        const file = req.files.file;
        console.log("File -> ", file);
       
        //path in which it is uploaded in the server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("Path -> ", path)

        //move func so we move the file acord to path
        file.mv(path, (err) =>{
            console.log(err);
        });

        //response
        res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        });
    }
    catch(error){
        console.log(error);
    }
};

//fuctions
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image Upload handler
exports.imageUpload = async(req, res) =>{
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log("Received data:", name, tags, email);

        const imageFile = req.files.imageFile;
        console.log("Image file:", imageFile);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = imageFile.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        // If format supported
        const response = await uploadFileToCloudinary(imageFile, "Rishika");
        console.log("Cloudinary upload response:", response);

        // Check if response is undefined
        if (!response) {
            return res.status(500).json({
                success: false,
                message: 'Upload to Cloudinary failed'
            });
        }

        // Database entry creation
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image uploaded Successfully"
        });

    } catch(error) {
        console.error("Error:", error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

// Video upload handler
exports.videoUpload = async(req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const videoFile = req.files.videoFile;
        console.log(videoFile);

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = videoFile.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        // If format supported
        const response = await uploadFileToCloudinary(videoFile, "Rishika");
        console.log(response);

        // DB entry creation
        const videoData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        });

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video uploaded Successfully"
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};


//image size reduce handler
exports.imageSizeReducer = async (req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const imageFileReducer = req.files.imageFileReducer;
        console.log(imageFileReducer);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = imageFileReducer.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            });
        }

        // If format supported
        const response = await uploadFileToCloudinary(imageFileReducer, "Rishika", 30);
        console.log(response);

        // DB entry creation
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Reduced Image uploaded Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

