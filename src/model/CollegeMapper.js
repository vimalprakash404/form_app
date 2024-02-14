const mongoose = require('mongoose');

const collegeMapperSchema = new mongoose.Schema({
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
        required: true ,
        unique : true
    }
});

const CollegeMapper = mongoose.model('CollegeMapper', collegeMapperSchema);

module.exports = CollegeMapper;
