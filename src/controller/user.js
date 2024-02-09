const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

// Sign-up function
async function signUp(username, password) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword
    });
    await newUser.save();
    return { success: true, message: 'User signed up successfully' };
  } catch (error) {
    return { success: false, message: 'An error occurred while signing up'+error };
  }
}

const secretKey = 'your_secret_key'; // Change this to your actual secret key

// Login function
async function login(username, password) {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return { success: false, message: 'User not found' };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: 'Invalid password' };
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '10h' });
    return { success: true, message: 'Login successful', token };
  } catch (error) {
    return { success: false, message: 'An error occurred while logging in' + error};
  }
}


const userLogin =async (req,res) => {
  res.status(200).json(await login(req.body.username,req.body.password));
};


module.exports = {userLogin,signUp};