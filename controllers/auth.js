const UserInfo = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signup = async (req, res) => {
    try{
        console.log(req.body);
        const { name, email, password, role } = req.body;
        
        const existingUser = await UserInfo.findOne({email : email});
        if(existingUser){
            console.log("User already exists");
            res.json({
                message: "User already exists",
                success: false,
            })
            process.exit(1);
        }

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            console.log(error);
            res.json({
                message: "Error hashing password",
                success: false,
            })
        }

        const user = await UserInfo.create({
            name, email, password : hashedPassword, role
        })
        res.status(200).json({
            success: true,
            user : user,
            messege : "signedup successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error " + error.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await UserInfo.findOne({email : email});
        if(!user){
            console.log("User not found");
            res.json({
                message: "User not found",
                success: false,
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : email,
                name : user.name,
                role : user.role,
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "2h",
            })

            user.token = token;
            user.password = undefined;

            res.status(200).json({
                success: true,
                user : user,
                token : token,
                message : "Logged in successfully"
            })
            // let options = {
            //     expires : new Date (Date.now() + 10000),
            //     httpOnly : true,
            // }
            // res.cookie("token", token, options).json({
            //     success: true,
            //     user : user,
            //     token : token,
            //     message : "Logged in successfully"
            // });
        }
        else{
            console.log("Passwords do not match");
            res.json({
                message: "Passwords do not match",
                success: false,
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}