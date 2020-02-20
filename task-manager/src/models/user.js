const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email not validate');
            } 
        }
    },
    age: {
        type: Number,
        default: 0
    }
});

module.exports = User;