const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { UserModel } = require('../models/user.model')
const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

const hashString = string => {
    const salt = bcrypt.genSaltSync(11);
    return bcrypt.hashSync(string, salt)
};

const hashImageName = (imageName) => {
    return crypto.createHash("md5").update(imageName).digest("hex");
};

const compareDataWithHash = (data, hashData) => {
    return bcrypt.compareSync(data, hashData)
};

const generateJwtToken = payload => {
    const { username } = payload;
    console.log(username);
    return jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: "5 days" })
};

const verifyToken = token => {
    const reuslt = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!reuslt?.username) throw { status: 401, success: false, message: "Please Log in to your account" }
    return reuslt;
};

const obscureEmail = email => {
    const [name, domain] = email.split("@");
    return `${name[0]}${name[1]}${name[2]}${new Array(name.length).join("*")}@${domain}`;
};

const createFilePath = async (req) => {
    const userId = req.user._id;
    const { username } = await UserModel.findOne({ _id: userId });
    const year = new Date().getUTCFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const filePath = path.join(`${__dirname}/../../public/uploads/${year}/${month}/${day}/images/${username}/profile`);
    return filePath;
};

// const checkFileExistance = (username, fileName) => {
//     const year = new Date().getUTCFullYear();
//     const month = new Date().getMonth();
//     const day = new Date().getDate();
//     let fpath = path.join(`${__dirname}/../../public/uploads/${year}/${month}/${day}/images/${username}/
//     profile`);
//     let fname = crypto.createHash("md5").update(fileName).digest("hex");
//     const dir = fs.openSync(fpath);
//     dir.includes(fname) ? 1 : 0;
// };

const storage = multer.diskStorage({
    destination: async function (req, file, callback) {
        const filePath = await createFilePath(req)
        fs.mkdirSync(filePath, { recursive: true })
        callback(null, filePath)
    },
    filename: function (req, file, callback) {
        let imageName = `${hashImageName(file.originalname)}.jpg`;
        console.log(checkFileExistance(req.user.username, imageName));
        callback(null, imageName)
    }
})

const FileUploader = multer({ storage: storage })

module.exports = {
    hashString,
    obscureEmail,
    compareDataWithHash,
    generateJwtToken,
    verifyToken,
    FileUploader,
    hashImageName
}