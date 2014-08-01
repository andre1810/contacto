'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var customerModel = function() {

  var customerSchema = new Schema({
    name: String, 
    branch: String, 
    website: String, 
    tags: [{
      type: String
    }], 
    reference: String,
    note: String,
    created: Date,
    updated: Date
  });

  customerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'customerId',
    startAt: 10000,
    incrementBy: 1
});

  return mongoose.model('Customer', customerSchema);
};

module.exports = new customerModel();