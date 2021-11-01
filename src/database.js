const mongoose = require('mongoose')

function connect(databaseURL) {
  return mongoose.connect(databaseURL)
}

module.exports = connect
