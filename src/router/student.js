const express = require('express')
const router = express.Router();
const {newInsertStudent , studentValidator, emailCheck , emailValidator , mobileCheck , mobileValidator} = require("../controller/student")
router.post('/insert',studentValidator,newInsertStudent);
router.post("/mobile",mobileValidator,mobileCheck);
router.post("/email", emailValidator, emailCheck)
module.exports  = router ;