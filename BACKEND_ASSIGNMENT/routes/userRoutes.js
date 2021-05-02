import express from 'express'
import bodyParser from 'body-parser'
import verifyToken from '../middleware/verifyToken.js'
import {
  userregister,
  getallusers,
  userlogin,
  userAddress,
  addjsonpatch,
  saveImagefromUrl,
} from '../controllers/userController.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/register').post(userregister)

router.route('/allusers').get(getallusers)

router.route('/login').get(userlogin)

router.route('/addaddress').post(verifyToken, userAddress)

router.route('/applyjsonpatch').get(verifyToken, addjsonpatch)

router.route('/saveimage').get(verifyToken, saveImagefromUrl)

export default router
