
  Meteor.subscribe("posts_subscription");
  Meteor.subscribe("comments_subscription");

  // Helper functions execute code within templates
  Template.feed.helpers({
    'post': function(){
        // Retrieve all of the data from the "postsList" collection and sort
        // them most recently created at the top
        return postsList.find({}, {sort: {dateCreated: -1} });

    },

    'creator': function(){
      //checks if post was created by current user
      return this.createdBy == Meteor.user().username;
    },

    'comment': function(){
      //shows the comments of each post
      return commentsList.find({parentPostId: this._id}, {sort: {dateCreated: 1}} );
    },

    'commentAdmin': function(){
      //returns true if the person who wrote the post is logged in
      //or the person who wrote the comment
      var currentUser = Meteor.user().username;
      var commentCreator = this.createdBy;
      var postCreator = postsList.findOne({_id: this.parentPostId}).createdBy;
      var isAdmin = currentUser == commentCreator || currentUser == postCreator;
      return isAdmin;

    }
  });

  // Events trigger code when certain actions are taken
  Template.feed.events({
    'click .card': function(){

      // Retrieve the unique ID of the post that's been clicked
      var postId = this._id;

      // Create a session to store the unique ID of the clicked post
      Session.set('selectedpost', postId);

    },
    'click .remove-post': function(){
      Meteor.call('removepost', this._id);
    },
    'click .remove-comment': function(){
      Meteor.call('removecomment', this._id);
    }
  });

  Template.addpostForm.events({
    'submit form': function(event){

      // Prevent the browser from applying default behaviour to the form
      event.preventDefault();

      // Get the value from the "postContent" text field
      var postContentVar = event.target.postContent.value;
      var postTagsVar = event.target.postTags.value;
      var tags = postTagsVar.split(',');

      //Trim each tag and clean up
      var x;
      for (x in tags){
        tags[x] = tags[x].toLowerCase().trim();
      }

      // Calls the insert post method
      Meteor.call('insertpost', postContentVar, tags);

      //Clear forms after posting
      event.target.postContent.value = "";
      event.target.postTags.value = "";

    }
  });

  Template.commentForm.events({
    'submit form': function(event){

      event.preventDefault();

      var commentContentVar = event.target.commentContent.value;
      var currentPost = this._id;
      //Call meteor function in the server js file
      Meteor.call('insertComment', commentContentVar, currentPost);
      //Clear form after posting
      event.target.commentContent.value = "";
    }
  });

  Template.filterForm.events({
    'submit form': function(event){
      event.preventDefault();
      var filtersVar = event.target.filters.value;
      var filters = filtersVar.split(',');

      //Trim each tag and clean up
      var x;
      for (x in filters){
        filters[x] = filters[x].toLowerCase().trim();
      }
      Meteor.call('addFilters', filters);
      event.target.filters.value = "";
    }
  });

  Template.showFilters.helpers({
    'userFilters': function(){
      //This function is causing an error for some reason
      var filters = Meteor.user().profile.filters;
      return filters;
    }
  });

  Template.showFilters.events({
    "click .remove-filter": function(){
      Meteor.call('removeFilter', this.toString());
    }

  })

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });
