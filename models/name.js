'use strict'

const mongoose = require('mongoose')

let nameSchema = new mongoose.Schema({
  name: String
})

let Name = mongoose.model('Name', nameSchema)

module.exports = Name;
