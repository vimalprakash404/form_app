const { reconstructFieldPath } = require("express-validator/src/field-selection")
const studentModel = require("../model/Student")
const { body, validationResult } = require("express-validator")
const geoip = require('geoip-lite');
const CollegeMapper = require("../model/CollegeMapper");
const collegeModel =require("../model/College")


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
        const { name, email, mobile, college, department, sem, preferred_location } = req.body;
        console.log(req.body);
        const existingStudent = await studentModel.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        })
        if (existingStudent !== null) {
            return res.status(403).json({ status: "error", message: "email or phone already exists" })
        }
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.useragent;

        // Extracting operating system, device, and location
        const os = userAgent.os;
        const device = userAgent.isDesktop ? 'Desktop' : (userAgent.isMobile ? 'Mobile' : 'Tablet');
        const browser=userAgent.browser;
        console.log(userAgent)
        console.log("existing data" + existingStudent);
        const date_time = new Date();
        const newStudent = new studentModel({ name, email, mobile, college, department, sem ,preferred_location ,ip ,os , device  , date_time });
        const result = await newStudent.save();
        return res.status(200).json({ status: "success", result })
    }
    catch (err) {
        return res.status(500).json({ status: "error", "error": err })
    }


}

const collegeNamePattern = /^(.*?)\s+\[/;
const districtPattern = /\[(.+)\]$/;

// Function to extract college name and district
function extractCollegeInfo(collegeInfo) {
    const collegeNameMatch = collegeInfo.match(collegeNamePattern);
    const districtMatch = collegeInfo.match(districtPattern);

    const collegeName = collegeNameMatch ? collegeNameMatch[1].trim() : "Unknown";
    const district = districtMatch ? districtMatch[1].trim() : "Unknown";

    return { collegeName, district };
}

const newInsertStudent = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({ status: "error", error: errors.array() })
        }
        const { name, email, mobile, college, department, sem, preferred_location } = req.body;
        console.log(req.body);
        const existingStudent = await studentModel.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        })
        if (existingStudent !== null) {
            return res.status(403).json({ status: "error", message: "email or phone already exists" })
        }
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.useragent;

        // Extracting operating system, device, and location
        const os = userAgent.os;
        const device = userAgent.isDesktop ? 'Desktop' : (userAgent.isMobile ? 'Mobile' : 'Tablet');
        const browser=userAgent.browser;
        const date_time = new Date();
        const { collegeName, district } = extractCollegeInfo(college)
        const newStudent = new studentModel({ name, email, mobile, college, department, sem ,preferred_location ,ip ,os , device  , date_time });
        const result = await newStudent.save();
        console.log("existing data" + existingStudent);
        const collegeObject = await collegeModel.findOne({name : collegeName});
        if(collegeObject!==null){
            const collegemapper = new CollegeMapper({
                collegeId : collegeObject._id ,
                studentId : result._id
            })
            await collegemapper.save()
        }
       
        return res.status(200).json({ status: "success", result })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: "error", "error": err })
    }


}

const emailValidator = [
    body('email').isEmail()
]
const emailCheck = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json({ status: "error", error: errors.array() })
    }
    else {
        const { email } = req.body;
        const existingStudent = await studentModel.findOne({
            $or: [
                { email: email }
            ]
        })
        if (existingStudent !== null) {
            return res.status(200).json({ status: true })
        }
        else {
            return res.status(200).json({ status: false })
        }
    }
}

const mobileValidator = [
    body("mobile")
]

const mobileCheck = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json({ status: "error", error: errors.array() })
    }
    else {
        const { mobile } = req.body;
        const existingStudent = await studentModel.findOne({
            $or: [
                { mobile: mobile }
            ]
        })
        if (existingStudent !== null) {
            return res.status(200).json({ status: true })
        }
        else {
            return res.status(200).json({ status: false })
        }
    }
}
module.exports = { insertStudent, newInsertStudent, studentValidator, emailValidator, mobileCheck, emailCheck, mobileValidator };