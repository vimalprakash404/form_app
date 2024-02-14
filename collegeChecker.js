require("./src/db/connection")
const college = require("./src/model/College")
const student = require("./src/model/Student")

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
        if((await college.findOne({name : collegeName ,district : district}))!==null){
            console.log("____________________________________________________");
            count = count +1 ;
        }
        console.log("count:", count)
    });
    
}

checkFunction();