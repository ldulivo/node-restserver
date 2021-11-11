const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');
const { isRoleValue, ifEmailExist, ifUserExist } = require('../helpers/db-validators');

const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', userGet);

/* router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'The password requires more than 8 characters.').isLength({ min: 8})
], userPost); */
router.post('/',[
    check('name')
        .not().isEmpty().withMessage('The name is required.')
        .not().isNumeric().withMessage('Must be only alphabetical chars.')
        .isLength({ min: 6 }).withMessage('Must be at least 6 chars long.'),
    check('email')
        .isEmail().withMessage('Email is invalid.'),
    check('email').custom( ifEmailExist ),
    check('password')
        .isLength({ min: 8}).withMessage('The password requires more than 8 characters.'),
    check('role').custom( isRoleValue ),
    validateFields
] , userPost);

router.put('/:id', [
    check('id').isMongoId().withMessage('ID invalid.'),
    check('id').custom( ifUserExist ),
    check('name')
        .not().isEmpty().withMessage('The name is required.')
        .not().isNumeric().withMessage('Must be only alphabetical chars.')
        .isLength({ min: 6 }).withMessage('Must be at least 6 chars long.'),
    check('email')
        .isEmail().withMessage('Email is invalid.'),
    check('email').custom( ifEmailExist ),
    check('password')
        .isLength({ min: 8}).withMessage('The password requires more than 8 characters.'),
    check('role').custom( isRoleValue ),
    validateFields
],userPut);

router.patch('/', userPatch);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id').isMongoId().withMessage('ID invalid.'),
    check('id').custom( ifUserExist ),
    validateFields
],userDelete);

module.exports = router;