
  Meteor.subscribe("posts_subscription");
  Meteor.subscribe("comments_subscription");

  // Helper functions execute code within templates
  Template.feed.helpers({
    'user': function(){
        // Retrieve all of the data from the "postsList" collection and sort
        // them most recently created at the top
        return Meteor.users.find();

    }
  });

  // Events trigger code when certain actions are taken
  Template.feed.events({
    'click .card': function(){
      //This is the id of the user featured in the post
      var userId = this._id;
      //For some reason username is undefined so this line doesnt work
      //var userName = Meteor.users.find({_id: userId.toString()}).fetch().username;
      var url = "/u/" + userId
      // Retrieve the unique ID of the post that's been clicked
      Router.go(url);

    }
  });

  Template.profileForm.events({
    //Takes all of the input values from the user profile form and supplies them
    //to the meteor method that updates the user profile object
   'submit form': function(){
     var fullName = event.target.fullName.value;
     var age = event.target.age.value;
     var strokeDate = event.target.strokeDate.value;
     var strokeType = event.target.strokeType.value;

     Meteor.call('addAttribute', fullName, age, strokeDate, strokeType);
   }

  })


  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });
