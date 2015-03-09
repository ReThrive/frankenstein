Router.route('/', {
  name: 'home',
  path: '/',
  subscriptions: function(){
    this.subscribe('users');
  }
})
Router.route('/settings', {
  name: 'settings',
  path: '/settings'
})
Router.route('/u/:userid', {
  name: 'user.profile',
  path: '/u/:userid',
  subscriptions: function(){
    this.subscribe('users');
  },
  data: function(){
    userIdVar = this.params.userid.toString();
    //console.log(userIdVar);
    //Returns an array of users so we just want the first one
    userObject = Meteor.users.find({_id: userIdVar}).fetch()[0];
    console.log(userObject);
    //Send the user profie object to the template
    userData = {
      profile: userObject.profile
    }
    return userData;
  },
  template: 'userProfile'
})

/*
Router.onBeforeAction(function() {
  if (Meteor.user() &&
    !Meteor.user().profile.profileComplete &&
    Router.current().route.getName() !== 'settings')
    {
        this.render('settings');
    }
  else {
    this.next();
    }
})
*/
