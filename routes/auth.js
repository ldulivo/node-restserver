const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { ifEmailExist } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email')
        .isEmail().withMessage('Email is invalid.'),
        check('password')
            .isLength({ min: 8}).withMessage('The password is invalid.'),
    validateFields
],login);

module.exports = router;