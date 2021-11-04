const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    //const query = req.query;
    const { q, nombre, apikey, page = 1, limit = 10 } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const userPut = (req, res = response) => {

    //const id = req.params.id;
    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}