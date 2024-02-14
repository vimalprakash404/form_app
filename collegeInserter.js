const fs = require('fs/promises'); // For reading files
require("./src/db/connection")
const College = require('./src/model/College'); // Assuming collegeModel.js is the file where you define the College model

// Define the insertCollege function
async function insertCollege(name, district, zone) {
  try {
    // Create a new College document
    const newCollege = new College({
      name: name,
      district: district,
      zone: zone
    });

    // Save the newCollege document to the database
    await newCollege.save();

    console.log('College inserted successfully:', name);
  } catch (error) {
    console.error('Error inserting college:', error.message);
    throw error;
  }
}

async function insertCollegesFromJSON(filePath) {
  try {
    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf8');
    const colleges = JSON.parse(data);

    // Insert each college from the JSON array
    const insertions = colleges.map(college => insertCollege(college.name, college.district, college.zone));

    // Wait for all insertions to complete
    await Promise.all(insertions);

    console.log('All colleges inserted successfully.');
  } catch (error) {
    console.error('Error inserting colleges:', error.message);
    throw error;
  }
}

// Example usage:
insertCollegesFromJSON('colleges.json')
  .then(() => {
    console.log('All colleges inserted successfully.');
    process.exit(0); // Exit with success code
  })
  .catch(error => {
    console.error('Error occurred:', error);
    process.exit(1); // Exit with error code
  });
