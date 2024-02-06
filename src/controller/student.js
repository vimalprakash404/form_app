const { reconstructFieldPath } = require("express-validator/src/field-selection")
const studentModel = require("../model/Student")
const { body, validationResult } = require("express-validator")
const studentValidator = [
    body('name').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('mobile').isMobilePhone().withMessage("Mobile requires only 10 digit numbers"),
    body('college').isString().notEmpty(),
    body('department').isString().notEmpty(),
    body('sem').isString().notEmpty()
]
const insertStudent = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({ status: "error", error: errors.array() })
        }
        const { name ,email, mobile ,college , department, sem} = req.body;
        const existingStudent = await studentModel.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        })
        if (existingStudent !== null) {
            return res.status(403).json({ status: "error", message: "email or phone already exists" })
        }
        console.log("existing data" + existingStudent);
        const newStudent = new studentModel({name, email, mobile ,college , department, sem});
        const result = await newStudent.save();
        return res.status(200).json({ status: "success", result })
    }
    catch (err) {
        return res.status(500).json({ status: "error", "error": err })
    }


}

const emailValidator= [
    body('email').isEmail()
]
const emailCheck =async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({status:"error",error:errors.array()})
    }
    else {
        const {email} = req.body;
        const existingStudent = await studentModel.findOne({ $or: [
            { email: email }
        ]})
        if (existingStudent !== null) {
            return res.status(200).json({status:true})
        }
        else{
            return res.status(200).json({status : false })
        }
    }
}

const mobileValidator = [
    body("mobile")
]

const mobileCheck = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({status:"error",error:errors.array()})
    }
    else {
        const {mobile} = req.body;
        const existingStudent = await studentModel.findOne({ $or: [
            { mobile: mobile }
        ]})
        if (existingStudent !== null) {
            return res.status(200).json({status:true})
        }
        else{
            return res.status(200).json({status : false })
        }
    }
}


module.exports = { insertStudent, studentValidator , emailValidator , mobileCheck , emailCheck  , mobileValidator };