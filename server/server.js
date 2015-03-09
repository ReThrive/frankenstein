Meteor.publish('users', function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});


  Meteor.methods({
//Helper method for user profile bits
//Adds each attribute to the user profile, if it is available.
//The data here comes from the form in the settings page
    'addAttribute':function(fullName, age, strokeDate, strokeType){
      if(fullName){
        Meteor.users.update({_id: this.userId}, {$set: {'profile.fullName': fullName}});}
      if(age){
        Meteor.users.update({_id: this.userId}, {$set: {'profile.age': age}});}
      if(strokeDate){
        Meteor.users.update({_id: this.userId}, {$set: {'profile.strokeDate': strokeDate}});}
      if(strokeType){
        Meteor.users.update({_id: this.userId}, {$set: {'profile.strokeType': strokeType}});}
      if(!Meteor.user().profile.profileComplete){
        Meteor.users.update({_id: this.userId}, {$set: {'profile.profileComplete': 1}});}
    },

//Helper method for FILTER events
    'addFilters': function(myFilters){
      //myFilters is an array of strings
      var x;
      for (x in myFilters){
        //each string in myFilters is pushed into the filters array of the user's profile
        Meteor.users.update({_id: this.userId}, {$push: {'profile.filters': myFilters[x]}});
      };
    },

    //Remove a filter form a user's profile - filter is a string
    'removeFilter': function(filter){
      Meteor.users.update({_id: this.userId}, {$pull: {'profile.filters': filter}});
    }
  });
