var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    Contact = require('../models/contact');

router.get('.json', function(req, res) {

  Contact.find()
    .select('_id customer position firstName lastName email phone mobile created updated')
    .exec(function(err, contacts) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(contacts);
      }
      
    });

});

router.get('/:id.json', function(req, res) {

  Contact.findById(req.params.id)
    .select('_id customer position firstName lastName email phone mobile created updated')
    .exec(function(err, contacts) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(contacts);
      }
      
    });

});

router.post('.json', function(req, res) {

  var parameters = _.pick(req.body, 'customer','position','firstName','lastName','email','phone','mobile');

  var contact = new Contact(parameters);

  contact.created = Date.now();

  contact.save(function(err) {

    if (err) {
      console.log(err);
      res.json(400);
    }
    else {
      res.json(201, _.pick(contact, '_id','customer','position','firstName','lastName','email','phone','mobile','created','updated'));
    }

  });

});

router.put('/:id.json', function(req, res) {

  var parameters = _.pick(req.body, 'position','firstName','lastName','email','phone','mobile');

  parameters = _.extend(parameters, { updated: Date.now() });

  Contact.findByIdAndUpdate({ _id: req.params.id }, { $set: parameters }, function(err, contact) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.json(200, _.pick(contact, '_id','customer','position','firstName','lastName','email','phone','mobile','created','updated'));
      }
      
    });

});

router.delete('/:id.json', function(req, res) {

  Contact.findByIdAndRemove(req.params.id, function (err) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.json(200);
      }
      
    });

});


module.exports = router;
