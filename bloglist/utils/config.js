require('dotenv').config()

const PORT = 3000
const password = process.argv[2]

module.exports = {
  PORT,
  password
}