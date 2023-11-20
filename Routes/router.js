const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')
//register

router.post('/user/register',userController.register)


//login
router.post('/user/login',userController.login)

//add project
router.post('/project/add', jwtMiddleware, multerConfig.single('projectThumb'),projectController.addProjects)
// export router
module.exports = router