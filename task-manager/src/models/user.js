const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        index: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisissaurabhchandil', {expiresIn: '1 seconds'})
    console.log('generateAuthToken : ', token)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token    
}

// userSchema.methods.verifyToken = async function () {
//     const user = this
//     const token = 
// }

// Creating our custom method in schema
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    
    if(!user) {
        throw new Error('User unregistred');
    } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            return user;
        } else {
            throw new Error('Unable to login');
        }
    }
}


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