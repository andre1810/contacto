'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var addressModel = function() {

  var addressSchema = new Schema({
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true
    },
    label: String, 
    street: String,
    zip: String,
    city: String,
    state: String,
    country: String,
    created: Date,
    updated: Date
  });

  return mongoose.model('Address', addressSchema);
};

module.exports = new addressModel();