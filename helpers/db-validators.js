const Role = require('../models/role');
const User = require('../models/user');

const isRoleValue = async(role = '') => {

    const existRole = await Role.findOne({ role });
    if ( !existRole ) {
        throw new Error(`The role ${ role } not exist in database`);
    }    
}

// Check if the email exist
const ifEmailExist = async ( email ) => {

    const existEmail = await User.findOne({ email });
    if ( existEmail ) {
        throw new Error('E-mail already in use');
    }
}

// Check if user id exist
const ifUserExist = async ( _id ) => {
    const existID = await User.findById({ _id });
    if ( !existID ) {
        throw new Error('ID invalid');
    }
}



module.exports = {
    isRoleValue,
    ifEmailExist,
    ifUserExist
}