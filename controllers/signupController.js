const users = require('../models/users'); 
const { Op } = require('sequelize');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 

// Configure multer to handle file uploads
const upload = multer();

const signupController = {
    //signup for the user
    async signup(req, res) {
        try {
          const { firstName, lastName, mobileNumber, email, organization, password } = req.body;
          console.log(req.body);
          
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
      }
    }
    module.exports = signupController;