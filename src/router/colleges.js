const express = require('express')
const router = express.Router();
const {getAllCollege,getNorthCollege,getSouthCollege} =require("../controller/colleges")
router.post("/st",getSouthCollege);
router.post("/nt",getNorthCollege);
router.post("/all",getAllCollege);
module.exports  = router ;