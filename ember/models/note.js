'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var noteModel = function() {

  var noteSchema = new Schema({
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: 'Customer',
      required: true
    },
    title: String,
    note: String, 
    created: Date,
    updated: Date
  });

  return mongoose.model('Note', noteSchema);
};

module.exports = new noteModel();