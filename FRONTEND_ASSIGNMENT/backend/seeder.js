import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './usersDetails/users.js'
import connectionDB from './config/db.js'
import User from './models/userModel.js'

dotenv.config()
connectionDB()

const addUserData = async () => {
  try {
    await User.deleteMany()
    await User.insertMany(users)
    console.log('User Data added')
    process.exit()
  } catch (error) {
    console.log(`Error ${error}`)
    process.exit(1)
  }
}
addUserData()
