var express = require('express'),
    router = express.Router(),
    _ = require('underscore'),
    Note = require('../models/note');

router.get('/', function(req, res) {

  Note.find()
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

router.get('/:id', function(req, res) {

  Note.findById(req.params.id)
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

router.get('/customers/:customerId/notes', function(req, res) {

  Note.findById({ customer: req.params.customerId })
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

router.post('/', function(req, res) {

  var parameters = _.pick(req.body, 'customer','title','note');

  var note = new Note(parameters);

  note.created = Date.now();

  note.save(function(err, note) {

    if (err) {
      console.log(err);
      res.json(400);
    }
    else {
      res.json(201, _.pick(note, '_id','customer','title','note','created','updated'));
    }

  });

});

router.put('/:id', function(req, res) {

  var parameters = _.pick(req.body, 'title','note');

  parameters = _.extend(parameters, { updated: Date.now() });

  Note.findByIdAndUpdate({ _id: req.params.id }, { $set: parameters }, function(err, note) {

      if (err) {
        console.log(err);
        res.json(400);
      }
      else {
        res.json(200, _.pick(note, '_id','customer','title','note','created','updated'));
      }
      
    });

});

router.delete('/:id', function(req, res) {

  Note.findByIdAndRemove(req.params.id, function (err) {

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
