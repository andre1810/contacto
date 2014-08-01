var attr = Ember.attr;

var Tag = {
  serialize: function(tag) {
    if (_.isArray(tag)) {
      return tag;
    }

    if (tag.length > 0) {
      return tag.split(',');
    }
    else {
      return null;
    }
  },
  deserialize: function(array) {
    if (array == null) {
      return null;
    }
    return array.join(',');
  }
};

App.Customer = Ember.Model.extend({
  _id: attr(),
  customerId: attr(),
  name: attr(),
  branch: attr(),
  website: attr(),
  tags: attr(Tag, { defaultValue:[] }),
  reference: attr(),
  note: attr(),
  created: attr(),
  updated: attr(),

  tagList: function() {
    
    if (this.get('tags').length > 0) {
      if (_.isArray(this.get('tags'))) {
        return this.get('tags').join(', ');
      }
      else {
        return this.get('tags').split(',').join(', ');
      }   
    }
    else {
      return null;
    }
    
  }.property('tags'),
  isUnchanged: function() {
    
    return !this.get('isDirty');
    
  }.property('isDirty')
});

App.Customer.adapter = Ember.RESTAdapter.create();
App.Customer.url = "customers";
App.Customer.primaryKey = '_id';