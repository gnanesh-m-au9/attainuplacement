import express from 'express'
import User from '../models/userModel.js'
import Address from '../models/addressModel.js'
import verifyToken from '../middleware/verifyToken.js'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import jsonpatch from 'jsonpatch'
import fs from 'fs'
import axios from 'axios'
import im, { resize } from 'imagemagick'

const IMAGE_PATH = '/uploads'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// @desc add new user
//access public
//post -> /user/register
router.post('/register', async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.status(200).json({ message: 'New user added' })
  } catch (error) {
    res.status(500)
    res.json({ message: 'cannot add new user' })
  }
})

// @desc get all users
//access public
//get -> /user/getusers
router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'cannot get users' })
  }
})

// @desc login user
//access public
//get -> /user/login
router.get('/login', async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    }
    const data = await User.findOne(user)
    if (!data) {
      res.status(400).json({ message: 'Invalid Credentials' })
    } else {
      var token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      })
      return res.send({ token: token, user: data })
    }
  } catch (error) {
    res.status(500)
    res.json({ message: 'cannot add new user' })
  }
})

// @desc add address of the user
// access private - can access only with JWT
// post -> /user/addaddress
router.post('/addaddress', verifyToken, async (req, res) => {
  try {
    await Address.create({
      user: req.body.id,
      street: req.body.street,
      area: req.body.area,
      city: req.body.city,
      pincode: req.body.pincode,
      country: req.body.country,
    })
    res.status(200).json({ message: 'Address added' })
  } catch (error) {
    res.status(500).json({ message: 'Cannot add address' })
  }
})

//@desc get json object and json patch object, apply json patch to json and return modified json object
// access private -> can access only with JWT
// get -> /user/applyjsonpatch
router.get('/applyjsonpatch', verifyToken, async (req, res) => {
  try {
    const jsonObject = req.body.jsonObject
    const thepatch = req.body.thepatch
    const patcheddoc = await jsonpatch.apply_patch(jsonObject, thepatch)
    return res.json(patcheddoc)
  } catch (error) {
    res.status(500).json({ message: 'cannot perform json patching' })
  }
})

router.get('/saveimage', async (req, res) => {
  try {
    const url = req.body.url

    const writer = fs.createWriteStream('./uploads/code.jpg')

    const response = await axios.get(url, { responseType: 'stream' })

    await response.data.pipe(writer)

    im.convert([
      './uploads/code.jpg',
      '-resize',
      '50*50',
      './thumbnail/codemodified.jpg',
    ])

    res.json({ message: 'Image saved' })
  } catch (error) {
    res.status(500).json({ message: 'Cannot save image' })
  }
})

export default router
