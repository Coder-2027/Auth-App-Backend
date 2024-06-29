const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try{
        console.log(req.cookies.token);
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace('Bearer ', "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(!decoded){
                return res.status(401).json({
                    success: false,
                    message: "Invalid token"
                })
            }
            req.user = decoded;
        }catch(e){
            return res.status(401).json({
                success: false,
                message: "Error verifying token"
            })
        }
        next();
    }
    catch(e){
        return res.status(401).json({
            success: false,
            message: "Error fetching token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try{
        console.log(req.user.role);
        if(req.user.role !== 'student'){
            return res.status(401).json({
                success: false,
                message: "You are not a student"
            })
        }
        next();
    }catch(error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Error while fetching data of role student",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== 'admin'){
            return res.status(401).json({
                success: false,
                message: "You are not a Administrator"
            })
        }
        next();
    }catch(error) {
        return res.status(401).json({
            success: false,
            message: "Error while fetching data of role of admin",
        })
    }
}

exports.isVisitor = (req, res, next) => {
    try{
        if(req.user.role !== 'visitor'){
            return res.status(401).json({
                success: false,
                message: "You are not a Visitor"
            })
        }
        next();
    }catch(error) {
        return res.status(401).json({
            success: false,
            message: "Error while fetching data of role of visitor",
        })
    }
}