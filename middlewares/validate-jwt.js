const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT =async ( req = request, res = response, next ) => {
    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request.'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const userSession = await User.findById( uid );

        if ( !userSession ) {
            return res.status(401).json({
                msg: 'Invalid token.'
            })
        }

        if ( !userSession.state ) {
            return res.status(401).json({
                msg: 'Invalid token.'
            })
        }

        req.userSession = userSession;
        
        next();
        
    } catch (error) {
        
        console.log(error);
        if ( error.name == 'TokenExpiredError') {
            msg = 'JWT expired.';
        } else {
            msg = 'Invalid token.';
        }
        res.status(401).json({
            msg
        });

    }

}

module.exports = {
    validateJWT
}