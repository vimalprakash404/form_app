const studentModel = require("../model/Student")
const Log = require("../model/Log")
const CollegeMapper = require('../model/CollegeMapper'); // Assuming the CollegeMapper model is exported from a file

const dashboard = async (req, res) => {
    try {
        const collegeMapperData = await CollegeMapper.find({}).populate({
            path: 'collegeId studentId'
        }).select('-_id -__v');

        const formattedStudentData = collegeMapperData.map(({ studentId, collegeId }) => ({
            Name: studentId.name,
            Email: studentId.email,
            Mobile: studentId.mobile,
            College: collegeId.name,
            Department: studentId.department,
            Sem: studentId.sem,
            District: collegeId ? collegeId.district : null,
            'Preferred location': studentId.preferred_location,
            'Date and Time': studentId.date_time
            
        }));

        const studentCount = await CollegeMapper.countDocuments({});
        const tvmCount = await studentModel.countDocuments({ "preferred_location": "Thiruvananthapuram" });
        const cltCount = await studentModel.countDocuments({ "preferred_location": "Kozhikode" });

        const logEntry = new Log({
            action: 'Data Fetched',
            user: req.user._id
        });

        logEntry.save()
            .then(savedLog => {
                console.log('Log saved:', savedLog);
            })
            .catch(error => {
                console.error('Error saving log:', error);
            });

        return res.status(200).json({
            'status': "success", data: {
                student: formattedStudentData,
                totalCount: studentCount,
                tvmCount,
                cltCount
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "status": "error", "error": "server error" + error });
    }
}

module.exports = { dashboard };

