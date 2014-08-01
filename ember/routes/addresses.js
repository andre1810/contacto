var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    Address = require('../models/address');

router.get('.json', function(req, res) {

  Address.find()
    .select('_id customer label street zip city state country created updated')
    .exec(function(err, addresses) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(addresses);
      }
      
    });

});

router.get('/:id.json', function(req, res) {

  Address.findById(req.params.id)
    .select('_id customer label street zip city state country created updated')
    .exec(function(err, addresses) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(addresses);
      }
      
    });

});

router.post('.json', function(req, res) {

  var parameters = _.pick(req.body, 'customer','label','street','zip','city','state','country');

  var address = new Address(parameters);

  address.created = Date.now();

  address.save(function(err, address) {

    if (err) {
      console.log(err);
      res.json(400);
    }
    else {
      res.json(201, _.pick(address, '_id','customer','label','street','zip','city','state','country','created','updated'));
    }

  });

});

router.put('/:id.json', function(req, res) {

  var parameters = _.pick(req.body, 'label','street','zip','city','state','country');

  parameters = _.extend(parameters, { updated: Date.now() });

  Address.findByIdAndUpdate({ _id: req.params.id }, { $set: parameters }, function(err, address) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.json(200, _.pick(address, '_id','customer','label','street','zip','city','state','country','created','updated'));
      }
      
    });

});

router.delete('/:id.json', function(req, res) {

  Address.findByIdAndRemove(req.params.id, function (err) {

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
