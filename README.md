# contacto CRM Demo Application Projects #
__contacto__ is a Customer Relationship Management Application. It´s implemented with AngularJS, Backbone.js, Ember.js and Meteor.

####Requirements:####
* Node.js >= v0.10.26
* MongoDB => v2.6.0

####Instructions:####

Meteor 0.9.1:

According to Meteor, Meteorid(mrt) is on the way to get deprecated. As I couldn't run the demo with the newest Meteor version, I have ported it and removed the Meteorid (mrt) dependency.

Meteor also uses a different way to set the ID of a document. It does not use the normal Mongo ObjectId, instead it uses its own datatype. 
While it may appear to be a string, Meteor will handle it differently. If you import the test-data according to the instructions in the root folder, you will get mixed id data types and corrupt the collection. To fill test-data into your mongodb, run the script and call [http://localhost:3000/dump]

In case the ./meteor_upgrade_091/private/test-data.json file does not exists, make a link to ./test-data.json

>> ln -s ./test-data.json ./meteor_upgrade_091/private/test-data.json  

use 'MONGO_URL="mongodb://127.0.0.1:27017/contacto_development" meteor run' in the ./meteor_upgrade_091 folder to start it.



AngularJS, Backbone.js, Ember.js:
Start MongoDB and run `npm start` in the dir of the selected project.

Meteor:
Just run `mrt` in the _./meteor/_ dir.

The app is available at [http://localhost:3000](http://localhost:3000) 

=================
André Hester, 5Minds IT-Solutions GmbH & Co.KG

