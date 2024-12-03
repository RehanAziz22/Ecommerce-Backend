const express = require("express")
const productController = require("../Controllers/ProductController")

const router = express.Router()

// http://localhost:3000/api/user/id
// router.get('/:id', userController.getSingleUser)

// http://localhost:3000/api/user/all
router.get('/', productController.getAllProducts)

// http://localhost:3000/api/user/signup
// router.post('/signup', userController.signupUser)

// http://localhost:3000/api/user/login
// router.post('/login', userController.loginUser)

// http://localhost:3000/api/user/id
// router.put('/:id', userController.updateUser)

// http://localhost:3000/api/user/id
// router.delete('/:id', userController.deleteUser)


module.exports = router
