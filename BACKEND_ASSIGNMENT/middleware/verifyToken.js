import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
  try {
    var token = req.headers['x-access-token']
    if (typeof token !== 'undefined') {
      const data = await jwt.verify(token, process.env.JWT_SECRET)
      if (!data) {
        res.status(400).json({ message: 'invalid token, please login again' })
      } else {
        next()
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'cannot verify token' })
  }
}
export default verifyToken
