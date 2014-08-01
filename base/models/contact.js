'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var contactModel = function() {

  var contactSchema = new Schema({
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true
    },
    position: String,
    firstName: String, 
    lastName: String, 
    email: String,
    phone: String,
    mobile: String,
    created: Date,
    updated: Date
  });

  return mongoose.model('Contact', contactSchema);
};

module.exports = new contactModel();