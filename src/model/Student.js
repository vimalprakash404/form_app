const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{ 
        type : String,
        require : true
    },
    email : {
        type: String,
        required: true,
        unique: true, // Ensures email is unique in the collection
        trim: true,   // Removes leading and trailing whitespaces
        lowercase: true, // Stores the email in lowercase
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Validates email format
    },
    mobile : {
        type  :  Number ,
        require  : true 
    },
    college  : {
        type : String ,
        require  :  true 
    },
    department : {
        type : String ,
        require : true 
    },
    sem :{
        type : String ,
        require : true 
    },
    preferred_location:{
        type : String
    },
    ip: String,
    os : String ,
    device : String ,
    iplocation :String 
});

const Person = mongoose.model('Student',studentSchema);
module.exports = Person; 