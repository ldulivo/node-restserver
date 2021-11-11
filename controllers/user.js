const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async (req = request, res = response) => {
    
    const { limit = 5, start = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(start) )
            .limit( Number(limit) )
    ])

    res.json({
        total,
        users
    });
}

const userPost = async (req, res = response) => {
    
    const { name, email, password, role } = req.body;

    // create instance
    const user = new User( { name, email, password, role } );

    // Encrypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // save instance
    await user.save();

    res.status(201).json({
        user
    });
}

const userPut = async (req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, google, ...residue } = req.body;

    if ( password ) {
        // Encrypt the password
        const salt = bcryptjs.genSaltSync();
        residue.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, residue );

    res.json({
        user
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;

    //const uid = req.uid;
    //const userSession = req.userSession;

    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json({
        user
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}