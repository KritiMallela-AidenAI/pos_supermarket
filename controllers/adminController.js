const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken"); 
const Admin = require("../models/admin");

const adminController = {
  admin: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        supermarketName,
        address,
        password,
        designation,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Please upload an image." });
      }

      const passkey = await bcrypt.hash(password, 10);
      const uuid = uuidv4();
      const adminId = uuid.substr(0, 6);

      const base64Photo = req.file.buffer.toString("base64");
      const newAdmin = await Admin.create({
        adminId: adminId,
        firstName,
        lastName,
        email,
        phoneNumber,
        supermarketName,
        address,
        password: passkey,
        designation,
        photo: base64Photo,
      });

      return res.status(201).json(newAdmin);
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { emailOrMobile, password } = req.body;
      const admin = await Admin.findOne({
        where: {
          [Op.or]: [{ email: emailOrMobile }, { phoneNumber: emailOrMobile }], 
        },
      });
      if (!admin) {
        return res.status(400).json({ error: "Invalid email or password." });
      }
      const isMatch = await bcrypt.compare(password, admin.password); 
      console.log('Password Match:', isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email/mobileNumber or password' });
      }

      const token = jwt.sign({ adminId: admin.adminId }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
      const { password: passkey, ...adminDetails } = admin.toJSON();
      console.log('User Details:', adminDetails);

      res.status(200).json({ message: 'Login successful', token: token, admin: adminDetails });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  viewAllAdmins: async (req, res) => {
    try {
      const allAdmins = await Admin.findAll();
      return res.status(200).json(allAdmins);
    } catch (error) {
      console.error("Error in viewAllAdmins:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  viewSingleAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const singleAdmin = await Admin.findOne({ where: { adminId: adminId } });
      return res.status(200).json(singleAdmin);
    } catch (error) {
      console.error("Error in viewSingleAdmin:", error); 
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getadminBysupermarketName: async (req, res) => { 
    try {
      const { supermarketName } = req.params;
      const singleAdmin = await Admin.findOne({
        where: { supermarketName: supermarketName },
      });
      return res.status(200).json(singleAdmin);
    } catch (error) {
      console.error("Error in getAdminBySupermarketName:", error); 
            return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const { supermarketName, firstName, lastName, email, phoneNumber } =
        req.body;
      const updatedAdmin = await Admin.update(
        { supermarketName, firstName, lastName, email, phoneNumber },
        { where: { adminId: adminId } } 
      );
      if (!updatedAdmin) { 
        return res.status(404).json({ error: "Admin not found." }); 
      }
      return res.status(200).json({ message: "Updated admin details" });
    } catch (error) {
      console.error("Error updating admin:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const deletedAdmin = await Admin.destroy({ where: { adminId: adminId } });
      if (!deletedAdmin) { 
        return res.status(404).json({ error: "Admin not found." });
      }
      return res.status(200).json({ message: "Deleted admin" });
    } catch (error) {
      console.error("Error in deleteAdmin:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = adminController;
