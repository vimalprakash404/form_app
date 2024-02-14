require("./src/db/connection")
const college = require("./src/model/College")
const student = require("./src/model/Student")
const collegeMapper = require("./src/model/CollegeMapper")
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

async function checkFunction() {
    const students = await student.find({})
    let count = 0 ;
    students.forEach(async (element) => {

        const { collegeName, district } = extractCollegeInfo(element.college);
        const co = await college.findOne({name : collegeName ,district : district});
        if(co!==null){
            const collegemapper = new collegeMapper(
                {
                    collegeId : co._id,
                    studentId : element._id
                }
            )
            console.log("creating college mapper for",element.name);
            collegemapper.save();
        }
    
    });
    
}

checkFunction();