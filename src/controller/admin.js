const studentModel = require("../model/Student")


const dashboard = async (req, res) => {
    try {
        const studentData = await studentModel.find({}).select('-ip -os -device -__v');
        const formattedStudentData = studentData.map(({ _id,name, email, mobile, college, department, sem, preferred_location, date_time, ...rest }) => ({
            Name: name,
            Email: email,
            Mobile: mobile,
            College: college,
            Department: department,
            Sem: sem,
            'Preferred location': preferred_location,
            'Date and Time': date_time
        }));
        const studentCount = await studentModel.countDocuments({});
        const tvmCount = await studentModel.countDocuments({"preferred_location": "Thiruvananthapuram"});
        const cltCount = await studentModel.countDocuments({"preferred_location": "Kozhikode"});
        return res.status(200).json({'status': "success", data: {
            student: formattedStudentData,
            totalCount: studentCount,
            tvmCount,
            cltCount
        }});
    } catch (error) {
        return res.status(500).json({"status": "error", "error": "server error" + error});
    }
}



module.exports = {dashboard}