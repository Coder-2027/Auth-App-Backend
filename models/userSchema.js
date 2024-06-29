const mongoose = require('mongoose');

const userInfo = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        enum : ["admin", "student", "visitor"],
    }
});

module.exports = mongoose.model('UserInfo', userInfo);