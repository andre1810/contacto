var assert = require('assert'),
    request = require('supertest'),
    _ = require('underscore');


before(function() {

  var debug = require('debug')('contacto');
  var app = require('../app');

  app.set('port', 3000);
  var server = app.listen(app.get('port'));
  
});
 
describe('Contacto', function() {
  var url = 'http://localhost:3000';
  
  var customer = {
        name: '5Minds IT-Solutions',
        branch: 'Software Development', 
        website: 'http://www.5minds.de', 
        tags: ["Software Development","JavaScript"], 
        reference: "Codetalks",
        note: "note",
      };

  
  describe('Customer', function() {

    var customerId, customerNr;

    it('should create a customer', function(done) {
      request(url)
        .post('/customers')
        .send(customer)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            customerId = res.body._id;
            customerNr = res.body.customerId;

            assert.notEqual(null, res.body.created);
            assert.deepEqual(customer.name, res.body.name);
            assert.deepEqual(customer.branch, res.body.branch);
            assert.deepEqual(customer.website, res.body.website);
            assert.deepEqual(customer.tags, res.body.tags);
            assert.deepEqual(customer.reference, res.body.reference);
            assert.deepEqual(customer.note, res.body.note);
            done();
          });
    });

    it('should list the created user', function(done) {
      request(url)
        .get('/customers/')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : customerId}).length);
            done();
          });
    });

    it('should list the created user by searching on tag', function(done) {
      request(url)
        .get('/customers/search/JavaScript')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : customerId}).length);
            done();
          });
    });

    it('should list the created user by searching on name', function(done) {
      request(url)
        .get('/customers/search/5Minds')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : customerId}).length);
            done();
          });
    });

    it('should list the created user by searching on name', function(done) {
      request(url)
        .get('/customers/search/IT-Solutions')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : customerId}).length);
            done();
          });
    });

    it('should list the created user by searching on key', function(done) {
      request(url)
        .get('/customers/search/5')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : customerId}).length);
            done();
          });
    });

    it('should get a customer by id', function(done) {
      request(url)
        .get('/customers/' + customerId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.deepEqual(customer.name, res.body.name);
            done();
          });
    });

    it('should get a customer by customer id', function(done) {
      request(url)
        .get('/customers/byCustomerId/' + customerNr)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.deepEqual(customer.name, res.body.name);
            done();
          });
    });

    it('should change a customer', function(done) {

      var newName = "5Minds";

      request(url)
        .put('/customers/' + customerId)
        .send({ name: newName })
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.notEqual(null, res.body.updated);
            assert.deepEqual(newName, res.body.name);
            done();
          });
    });

    it('should delete a customer', function(done) {

      request(url)
        .delete('/customers/' + customerId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });

  });

describe('Addresses', function() {

    var address = {
      customer: null,
      label: 'primary',
      street: 'Street Nr 1',
      zip: '123456',
      city: 'City',
      state: 'New State',
      country: 'Germany'
    };

    var customerId, addressId;

    it('should create a customer', function(done) {

      request(url)
        .post('/customers')
        .send(customer)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            customerId = res.body._id;
            address.customer = res.body._id;

            assert.notEqual(null, res.body.created);
            assert.deepEqual(customer.name, res.body.name);
            assert.deepEqual(customer.branch, res.body.branch);
            assert.deepEqual(customer.website, res.body.website);
            assert.deepEqual(customer.tags, res.body.tags);
            assert.deepEqual(customer.reference, res.body.reference);
            assert.deepEqual(customer.note, res.body.note);
            done();
          });
    });

    it('should create a address', function(done) {

      request(url)
        .post('/addresses')
        .send(address)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            addressId = res.body._id;

            assert.deepEqual(address.label, res.body.label);
            assert.deepEqual(address.street, res.body.street);
            assert.deepEqual(address.zip, res.body.zip);
            assert.deepEqual(address.city, res.body.city);
            assert.deepEqual(address.state, res.body.state);
            assert.deepEqual(address.country, res.body.country);
            done();
          });
    });

    it('should list the created address', function(done) {
      request(url)
        .get('/addresses/')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : addressId}).length);
            done();
          });
    });

    it('should get an address', function(done) {
      request(url)
        .get('/addresses/' + addressId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.deepEqual(addressId, res.body._id);
            done();
          });
    });

    it('should change an address', function(done) {

      var newLabel = "secondary";

      request(url)
        .put('/addresses/' + addressId)
        .send({ label: newLabel })
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.notEqual(null, res.body.updated);
            assert.deepEqual(newLabel, res.body.label);
            done();
          });
    });

    it('should delete an address', function(done) {

      request(url)
        .delete('/addresses/' + addressId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });
    
    it('should delete a customer', function(done) {

      request(url)
        .delete('/customers/' + customerId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });

  });

  describe('Contacts', function() {

    var contact = {
      customer: null,
      position: 'CEO',
      firstName: 'Max', 
      lastName: 'Mustermann', 
      email: 'maxmustermann@contacto.com',
      phone: '+491234567890',
      mobile: '+491234567890'
    };

    var customerId, contactId;

    it('should create a customer', function(done) {

      request(url)
        .post('/customers')
        .send(customer)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            customerId = res.body._id;
            contact.customer = res.body._id;

            assert.notEqual(null, res.body.created);
            assert.deepEqual(customer.position, res.body.position);
            assert.deepEqual(customer.firstName, res.body.firstName);
            assert.deepEqual(customer.lastName, res.body.lastName);
            assert.deepEqual(customer.email, res.body.email);
            assert.deepEqual(customer.phone, res.body.phone);
            assert.deepEqual(customer.mobile, res.body.mobile);
            done();
          });
    });

    it('should create a contact', function(done) {

      request(url)
        .post('/contacts')
        .send(contact)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            contactId = res.body._id;

            assert.deepEqual(contact.position, res.body.position);
            assert.deepEqual(contact.firstName, res.body.firstName);
            assert.deepEqual(contact.lastName, res.body.lastName);
            assert.deepEqual(contact.email, res.body.email);
            assert.deepEqual(contact.phone, res.body.phone);
            assert.deepEqual(contact.mobile, res.body.mobile);
            done();
          });
    });

    it('should list the created contact', function(done) {
      request(url)
        .get('/contacts/')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : contactId}).length);
            done();
          });
    });

    it('should get a contact', function(done) {
      request(url)
        .get('/contacts/' + contactId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.deepEqual(contactId, res.body._id);
            done();
          });
    });

    it('should change a contact', function(done) {

      var newPosition = "CTO";

      request(url)
        .put('/contacts/' + contactId)
        .send({ position: newPosition })
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.notEqual(null, res.body.updated);
            assert.deepEqual(newPosition, res.body.position);
            done();
          });
    });

    it('should delete a contact', function(done) {

      request(url)
        .delete('/contacts/' + contactId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });
    
    it('should delete a customer', function(done) {

      request(url)
        .delete('/customers/' + customerId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });

  });

  describe('Note', function() {

    var note = {
      customer: null,
      title: 'test note',
      note: 'lorem ipsum'
    };

    var customerId, noteId;

    it('should create a customer', function(done) {

      request(url)
        .post('/customers')
        .send(customer)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            customerId = res.body._id;
            note.customer = res.body._id;

            assert.notEqual(null, res.body.created);
            assert.deepEqual(customer.name, res.body.name);
            assert.deepEqual(customer.branch, res.body.branch);
            assert.deepEqual(customer.website, res.body.website);
            assert.deepEqual(customer.tags, res.body.tags);
            assert.deepEqual(customer.reference, res.body.reference);
            assert.deepEqual(customer.note, res.body.note);
            done();
          });
    });

    it('should create a note', function(done) {

      request(url)
        .post('/notes')
        .send(note)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(201, res.status);

            assert.notEqual(null, res.body._id);
            noteId = res.body._id;

            assert.notEqual(null, res.body.created);
            assert.deepEqual(note.title, res.body.title);
            assert.deepEqual(note.note, res.body.note);
            done();
          });
    });

    it('should list the created note', function(done) {
      request(url)
        .get('/notes/')
        .end(function(err, res) {
            if (err) {
              throw err;
            }

            assert.equal(1, _.where(res.body, { _id : noteId}).length);
            done();
          });
    });

    it('should get a note', function(done) {
      request(url)
        .get('/notes/' + noteId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.deepEqual(noteId, res.body._id);
            done();
          });
    });

    it('should change a note', function(done) {

      var newTitle = "note test";
      var newNote = "ipsum lorem";

      request(url)
        .put('/notes/' + noteId)
        .send({ title: newTitle, note: newNote })
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            assert.notEqual(null, res.body.updated);
            assert.deepEqual(newTitle, res.body.title);
            assert.deepEqual(newNote, res.body.note);
            done();
          });
    });

    it('should delete a note', function(done) {

      request(url)
        .delete('/notes/' + noteId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });
    
    it('should delete a customer', function(done) {

      request(url)
        .delete('/customers/' + customerId)
        .end(function(err, res) {
            if (err) {
              throw err;
            }
            assert.equal(200, res.status);
            done();
          });
    });

  });

});