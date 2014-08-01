var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Customer = require('../models/customer'),
    Address = require('../models/address'),
    Contact = require('../models/contact'),
    Note = require('../models/note');

router.get('/', function(req, res) {

  Customer.find()
    .select('_id customerId name branch website tags reference note created updated')
    .limit(300)
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(customers);
      }
      
    });

});

router.get('/tags', function(req, res) {

  var resultTags = [];

  Customer.find()
    .select('tags')
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {

        _.each(customers, function(customer) {
          resultTags.push(customer.tags);
        });

        res.send(_.uniq(_.flatten(resultTags)).sort());
      }
      
    });

});

router.get('/count', function(req, res) {

  Customer.count({}, function(err, count) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.json(200, { count: count });
      }
      
    });

});

router.get('/recently_added', function(req, res) {

  var filterDate = new Date();
  filterDate.setDate(filterDate.getDate() -7); 

  Customer.find()
    .where('created').gt(filterDate)
    .select('_id customerId name branch website tags reference note created updated')
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(customers);
      }
      
    });

});

router.get('/startsWith/:key', function(req, res) {
  console.log(req.params.key);
  Customer.find({ "name": new RegExp('^' + req.params.key) })
    .select('_id customerId name branch website tags reference note created updated')
    .limit(300)
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(customers);
      }
      
    });

});

router.get('/search/:key', function(req, res) {

  var tags = req.params.key.split(',');

  Customer.find({ $or: [{ "name": new RegExp(req.params.key) }, { tags: { $in: tags } } ] })
    .select('_id customerId name branch website tags reference note created updated')
    .limit(300)
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(customers);
      }
      
    });

});

router.get('/:id', function(req, res) {

  Customer.findById(req.params.id)
    .select('_id customerId name branch website tags reference note created updated')
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(customers);
      }
      
    });

});

router.get('/:id/addresses', function(req, res) {

  Address.find({ customer: req.params.id })
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

router.get('/:id/contacts', function(req, res) {

  Contact.find({ customer: req.params.id })
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

router.get('/:id/notes', function(req, res) {

  Note.find({ customer: req.params.id })
    .select('_id customer title note created updated')
    .exec(function(err, notes) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(notes);
      }
      
    });

});

router.get('/byCustomerId/:customerId', function(req, res) {

  Customer.find({ customerId: req.params.customerId })
    .select('_id customerId name branch website tags reference note created updated')
    .exec(function(err, customers) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.send(_.first(customers));
      }
      
    });

});

router.post('/', function(req, res) {

  var parameters = _.pick(req.body, 'name','branch','website','tags','reference','note');

  var customer = new Customer(parameters);

  customer.created = Date.now();

  customer.save(function(err) {

    if (err) {
      console.log(err);
      res.json(400);
    }
    else {
      res.json(201, _.pick(customer, '_id','customerId','name','branch','website','tags','reference','note','created','updated'));
    }

  });

});

router.put('/:id', function(req, res) {

  var parameters = _.pick(req.body, 'name','branch','website','tags','reference','note');

  parameters = _.extend(parameters, { updated: Date.now() });

  Customer.findByIdAndUpdate({ _id: req.params.id }, { $set: parameters }, function(err, customer) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.json(_.pick(customer, '_id','customerId','name','branch','website','tags','reference','note','created','updated'));
      }
      
    });

});

router.delete('/:id', function(req, res) {

  Contact.remove({ customer: req.params.id }, function(err) {

      if (err) {
        console.log(err);
      }

    });

  Address.remove({ customer: req.params.id }, function(err) {

      if (err) {
        console.log(err);
      }

    });

  Note.remove({ customer: req.params.id }, function(err) {

      if (err) {
        console.log(err);
      }

    });

  Customer.findByIdAndRemove(req.params.id, function (err) {

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
