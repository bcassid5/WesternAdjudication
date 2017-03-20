import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  isUsersShowing: false,
  isFeatureEditing: false,
  isRolesEditing: false,
  isHomeShowing: true,
  
  H: "item active",
  SR: "item",
  MC: "item",
  CR: "item",
  ADM01IsPermitted: Ember.computed(function(){ //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ADM01") >= 0);
    }
  }),

  didInsertElement() {
    Ember.$(document).ready(function(){
      Ember.$('.ui .item').on('click', function() {
        Ember.$('.ui .item').removeClass('active');
        Ember.$(this).addClass('active');
      });
    });
  },

  actions: {
    manageUsers () {
      this.set('isUsersShowing', true);
      this.set('isHomeShowing', false);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', false);
      
      this.set('H', 'item');
      this.set('SR', 'item active');
      this.set('MC', 'item');
      this.set('CR', 'item');

    },
    manageRoles (){
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', true);
      this.set('isHomeShowing', false);
      
      this.set('H', 'item');
      this.set('SR', 'item');
      this.set('MC', 'item');
      this.set('CR', 'item active');
    },

    manageFeatures (){
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', true);
      this.set('isRolesEditing', false);
      this.set('isHomeShowing', false);
      
      this.set('H', 'item');
      this.set('SR', 'item');
      this.set('MC', 'item active');
      this.set('CR', 'item');
    },
    home()
    {
      this.set('isUsersShowing', false);
      this.set('isFeaturesEditing', false);
      this.set('isRolesEditing', false);
      this.set('isHomeShowing', true);
      this.set('H', 'item active');
      
      this.set('SR', 'item');
      this.set('MC', 'item');
      this.set('CR', 'item');
      
    },
    
    exitAdmin(){
      this.get('routing').transitionTo('home');
    },


  }
});
