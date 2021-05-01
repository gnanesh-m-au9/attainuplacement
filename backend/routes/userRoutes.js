import express from 'express'
import bodyParser from 'body-parser'
import {
  getallusers,
  getuser,
  addnewuser,
  updateuser,
  deleteuser,
} from '../controllers/userController.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// get all users
router.route('/').get(getallusers)

// get single user by id
router.route('/:id').get(getuser)

// add new user
router.route('/addnewuser').post(addnewuser)

// update user
router.route('/updateuser').put(updateuser)

// delete user
router.route('/deleteuser').delete(deleteuser)

export default router
