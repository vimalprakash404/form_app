const express = require('express')
const router = express.Router();
const {dashboard} = require("../controller/admin")
const auth =require("../middleware/auth")
router.post("/dashboard",auth,dashboard);
module.exports = router;