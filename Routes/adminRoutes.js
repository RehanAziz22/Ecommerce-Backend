const express = require("express")
const adminController = require("../Controllers/adminController")

const router = express.Router()

router.get('/:id',adminController.getAdmin)
router.get('/',adminController.getAllAdmins)
router.post('/signup',adminController.signupAdmin)
router.post('/login',adminController.loginAdmin)
router.put('/:id',adminController.updateAdmin)
router.delete('/:id',adminController.deleteAdmin)


module.exports = router

