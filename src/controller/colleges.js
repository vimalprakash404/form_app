const College = require('../model/College'); // Assuming collegeModel.js is the file where you define the College model
async function getCollegeNamesWithDistricts(zone) {
  try {
    // Find all colleges
    const colleges = await College.find({zone :zone }, { name: 1, district: 1, _id: 0 });
    // Format college names with districts
    const formattedColleges = colleges.map(college => `${college.name} [${college.district}]`);

    console.log('College names with districts:', formattedColleges);
    return formattedColleges;
  } catch (error) {
    console.error('Error fetching college names with districts:', error.message);
    throw error;
  }
}

async function getNorthCollege(req, res){
    const data = await getCollegeNamesWithDistricts("north")
    return res.status(200).json({colleges : data})
}

async function getSouthCollege(req, res){
    const data = await getCollegeNamesWithDistricts("south")
    return res.status(200).json({colleges : data})
}

async function getAllCollege(req , res) {
    try {
      // Find all colleges
      const colleges = await College.find({}, { name: 1, district: 1, _id: 0 });
      // Format college names with districts
      const formattedColleges = colleges.map(college => `${college.name} [${college.district}]`);
  
      console.log('College names with districts:', formattedColleges);
      return res.status(200).json({"colleges":formattedColleges});
    } catch (error) {
      console.error('Error fetching college names with districts:', error.message);
      throw error;
    }
  }

module.exports = {getSouthCollege, getNorthCollege ,getAllCollege}