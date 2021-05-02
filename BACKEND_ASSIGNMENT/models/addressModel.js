import mongoose from 'mongoose'

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  street: {
    type: String,
  },
  area: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

const Address = mongoose.model('Address', addressSchema)

export default Address
