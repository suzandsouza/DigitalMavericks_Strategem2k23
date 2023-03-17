const express=require('express')
const { registerUser, loginUser, logout, getAllUsers, getSingleUser }= require('../controllers/userController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router=express.Router()
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logout)

router.route('/home').get(isAuthenticatedUser)
router.route('/admin/users/').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
module.exports=router