const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.file;
        console.log("File aa gyi->", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);
        
        file.mv(path, (error) =>{
            console.log(error);
        });
        req.json({
            success: true,
            message: 'local file upload succussfuly',
        });
    }
    catch(error){
        console.log(error);

    }
}

function isFileTypeSupported (type, supportedTypes){
    // return supportedTypes.includes(type);
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//Image Upload 

exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log (name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        //file format not supported
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);
        
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.json({
                success: false,
                message:"File format not supported",
            })
        }
        //file format supported
        console.log("jalaj kumar");
        const response = await uploadFileToCloudinary(file, "jalajk");
        console.log(response);

        //db me entry save
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });
        res.json({
            success: true,
            message:"Image succefully Uploaded",
            imageUrl:response.secure_url,
        })


    }
    catch{
        console.error(error);
        res.status(400).json({
            success: false,
            message:"somthing went wrong",
        })

    }
}

//video upload

exports.videoUpload = async (req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);
        //to add limite for 5m
        console.log("jk")
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.json({
                success: false,
                message:"File format not supported",
            })
        }

        //file format supported
        const response = await uploadFileToCloudinary(file, "jalajk");
        console.log(response);

          //db me entry save
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });
 
        res.json({
            success: true,
            message:"video succefully Uploaded",
            imageUrl:response.secure_url, 
        })
        
    }
    catch{
        console.error(error);
        return res.status(400).json({
            success: false,
            message:"somthing went wrong",
        })
    }
}