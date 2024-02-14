const College = require('./src/model/College'); // Assuming collegeModel.js is the file where you define the College model
require("./src/db/connection")
async function getCollegeNamesWithDistricts() {
  try {
    // Find all colleges
    const colleges = await College.find({zone : "north"}, { name: 1, district: 1, _id: 0 });
    console.log(await College.countDocuments({zone : "north"}, { name: 1, district: 1, _id: 0 }))
    // Format college names with districts
    const formattedColleges = colleges.map(college => `${college.name} [${college.district}]`);

    console.log('College names with districts:', formattedColleges);
    return formattedColleges;
  } catch (error) {
    console.error('Error fetching college names with districts:', error.message);
    throw error;
  }
}

// Example usage:
getCollegeNamesWithDistricts()
  .then(() => {
    console.log('All college names with districts fetched successfully.');
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
