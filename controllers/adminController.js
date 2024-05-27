const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer();
const Admin = require("../models/admin");
// admin signup
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

      // Check if file upload succeeded
      if (!req.file) {
        return res.status(400).json({ error: "Please upload an image." });
      }

      const passkey = await bcrypt.hash(password, 10);
      const uuid = uuidv4();
      const adminId = uuid.substr(0, 6);

      // Read the image file and convert it to base64
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
  //view all admins
  viewAllAdmins: async (req, res) => {
    try {
      const allAdmins = await Admin.findAll();
      return res.status(200).json(allAdmins);
    } catch (error) {
      console.error("Error in viewAllAdmins:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //view a single admin
  viewSingleAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const singleAdmin = await Admin.findOne({ where: { adminId: adminId } });
      return res.status(200).json(singleAdmin);
    } catch (error) {
      console.error("Error in viewAllAdmins:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //  get admin By supermarketName

  getadminBysupermarketName: async (req, res) => {
    try {
      const { supermarketName } = req.params;
      const singleAdmin = await Admin.findOne({
        where: { supermarketName: supermarketName },
      });
      return res.status(200).json(singleAdmin);
    } catch (error) {
      console.error("Error in viewAllAdmins:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // update admin
  updateAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const { supermarketName, firstName, lastName, email, phoneNumber } =
        req.body;
      const updatedAdmin = await Admin.update(
        { supermarketName, firstName, lastName, email, phoneNumber },
        { where: { adminId } }
      );
      if (!adminId) {
        return res.status(404).json({ error: "admin not found." });
      }
      return res.status(200).json({ message : "updated Admin details"});
    } catch (error) {
      console.error("Error updating admin:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // delete admin
  deleteAdmin: async (req, res) => {
    try {
      const { adminId } = req.params;
      const deletedAdmin = await Admin.destroy({ where: { adminId: adminId } });
      return res.status(200).json({message:"deleted Admin"});
    } catch (error) {
      console.error("Error in deleteAdmin:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = adminController;
