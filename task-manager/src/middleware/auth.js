const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        let user
        //console.log('token length:', token.length)
        if(token.length > 20) {
            const decoded = jwt.verify(token, 'thisissaurabhchandil')
            user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        } else {
            throw new Error('Please login')
        }
                
        if(!user) {
            throw new Error('Fake User');
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        //console.log('Error in auth : ', error)
        res.status(401).send(error.message)
    }
}

module.exports = auth