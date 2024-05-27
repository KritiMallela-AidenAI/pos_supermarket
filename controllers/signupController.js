const users = require('../models/users'); 
const { Op } = require('sequelize');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 
const upload = multer();

const signupController = {
    //signup for the user
    async signup(req, res) {
        try {
          const { firstName, lastName, mobileNumber, email, organization, password } = req.body;
          console.log({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            organization: req.body.organization,
          });
          
          
          // Check if file upload succeeded
          if (!req.file) {
            return res.status(400).json({ error: 'Please upload an image.' });
          }

          const passkey = bcrypt.hashSync(password, 10);
      
          const uuid = uuidv4();
          const userId = uuid.substr(0, 6);
          // Read the image file and convert it to base64
          const base64Photo = req.file.buffer.toString('base64');
          const newUser = await users.create({
            userId: userId,
            firstName,
             lastName,
              mobileNumber,
               email,
                organization,
                 passkey: passkey,
            photo: base64Photo
          });
      
          return res.status(201).json(newUser);
        } catch (error) {
          console.error('Error in signup :', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    // get all the users
async getAllUsers(req, res) {
    try {
        const allUsers = await users.findAll(); 
        return res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
,
// get single user by userId
async getUserbyuserId(req, res) {
    try {
      const { userId } = req.params;
      const user = await users.findAll({ where: { userId } });
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error in fetching user :', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // update user details
  async updateUser(req, res) {
    try {
        const { userId } = req.params;
        if(!userId){
            return res.status(404).json({message:"userId required"});
        }
        const { firstName, lastName, mobileNumber, email, organization } = req.body;
        const user = await users.update({ firstName, lastName, mobileNumber, email, organization }, { where: { userId } });
        return res.status(200).json({ message: 'updated successfully' });
        } catch (error) {
            console.error('Error in fetching user :', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
},

// delete user by userId
async deleteUser(req, res) {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required.' });
          }
            const deletedCount = await users.destroy({ where: { userId: userId } });
            if (deletedCount === 0) {
            return res.status(404).json({ error: 'user not found.' });
          }
          // Return success response
          return res.status(200).json({ message: 'user deleted successfully.' });
        } catch (error) {
          console.error('Error deleting user:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    }  
    
 
    module.exports = signupController;