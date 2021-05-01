import User from '../models/userModel.js'

// get all users
const getallusers = async (req, res) => {
  try {
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
          first_name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    const count = await User.countDocuments({ ...keyword })
    const users = await User.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    res.json({ users, page, pages: Math.ceil(count / pageSize) })
  } catch (error) {
    res.status(500)
  }
}

//  get single user by id
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(400)
      throw new Error('user not found')
    }
  } catch (error) {
    res.status(500)
    throw new Error('cannot fetch user')
  }
}

// add new user
const addnewuser = async (req, res) => {
  try {
    await User.create({
      first_name: req.body.firstname,
      last_name: req.body.secondname,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
    })
    res.json({ message: 'New user added' })
  } catch (error) {
    res.status(500)
    throw new Error('cannot add new user')
  }
}

// update user
const updateuser = async (req, res) => {
  await User.updateMany(
    { _id: req.body._id },
    {
      $set: {
        first_name: req.body.firstname,
        last_name: req.body.secondname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500)
        throw new Error('cannot update user')
      } else {
        res.json({ message: ' User updated succesfully' })
      }
    }
  )
}

const deleteuser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.body.id })
    res.status(200).json({ message: 'User deleted succesfully' })
  } catch (error) {
    throw new Error('Cannot delete user')
  }
}

export { getallusers, getuser, addnewuser, updateuser, deleteuser }
