  Meteor.publish('posts_subscription', function(){
    var user = Meteor.users.findOne({_id: this.userId});
    var filters = user.profile.filters;
    if(filters.length == 0){
      return postsList.find();
    }
    else{
      return postsList.find({tags: {$elemMatch: {$in: filters}}});
    }
  })

  Meteor.publish('comments_subscription', function(){
    return commentsList.find();
  })
/*
  Meteor.publish('allposts', function(){
    return postsList.find();
  });

  Meteor.publish('filteredposts', function(){
    var user = Meteor.users.findOne(this.userId);
    var filters = user.profile.filters;
    return postsList.find({tags: {$elemMatch: {$in: filters}}});
  });
*/


//Helper methods for FEED EVENTS
  Meteor.methods({
    'insertpost': function(postContentVar, tags){
      // Returns the userid of the currently logged in user
      var currentUser = Meteor.user().username;

      // Insert the new post into the collection
      // createdBy is the current user's case sensitive username
      postsList.insert({
        content: postContentVar,
        dateCreated: Date.now(),
        createdBy: currentUser,
        tags: tags
      });
    },

    'removepost': function(selectedpost){
      // Remove a document from the collection
      postsList.remove(selectedpost);
    },

    'insertComment': function(commentContentVar, parentPost){
      var currentUser = Meteor.user().username;

      commentsList.insert({
        content: commentContentVar,
        dateCreated: Date.now(),
        createdBy: currentUser,
        parentPostId: parentPost
      });
    },

    'removecomment': function(selectedpost){
      // Remove a document from the collection
      commentsList.remove(selectedpost);
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
