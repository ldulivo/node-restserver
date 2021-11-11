const { response } = require('express');

const isAdminRole = ( req, res = response, next ) => {

    if ( !req.userSession ) {
        return res.status(500).json({
            msg: 'You want to verify the role without validating token.'
        });
    }

    const { role } = req.userSession;
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: 'Invalid token.'
        })
    }

    next();
}

const hasRole = ( ...roles ) => {

    return ( req, res = response, next) => {

        if ( !req.userSession ) {
            return res.status(500).json({
                msg: 'You want to verify the role without validating token.'
            });
        }

        if ( !roles.includes( req.userSession.role ) ){
            return res.status(401).json({
                msg: `Requires role of: ${ roles }`
            })
        }


        next()
    }

}

module.exports = {
    isAdminRole,
    hasRole
}