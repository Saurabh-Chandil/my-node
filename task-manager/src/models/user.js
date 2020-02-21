const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
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
    },
    password: {
        type: String
    }
});

userSchema.pre('save', async function(next) {
    // 'this' refers to doc being saved
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next(); // to transfer control to other middleware in the middleware stack. If we do not put this 
    //then our compiler will assume that we are still running this function and user doc will not be 'save'.
})

const User = mongoose.model('User', userSchema);

module.exports = User;