require('dotenv').config();

const PORT = 3000
const password = process.argv[2]

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
//const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  PORT,
  password,
  MONGODB_URI
}