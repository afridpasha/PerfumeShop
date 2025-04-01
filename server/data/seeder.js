const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Perfume = require('../models/Perfume');
const users = require('./users');
const perfumes = require('./perfumes');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Perfume.deleteMany();

    // Add required fields to users data
    const updatedUsers = users.map(user => ({
      ...user,
      fullName: user.name || 'Admin User', // Use existing name or default
      phoneNumber: user.phoneNumber || '1234567890', // Add default phone number
    }));

    const createdUsers = await User.insertMany(updatedUsers);
    const adminUser = createdUsers[0]._id;

    const samplePerfumes = perfumes.map((perfume) => {
      return { ...perfume, user: adminUser };
    });

    await Perfume.insertMany(samplePerfumes);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Perfume.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 