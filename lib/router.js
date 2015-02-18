Router.route('/', {
  name: 'home',
  path: '/',
  subscriptions: function(){
    this.subscribe('posts_subscription');
  }
})
Router.route('/settings', function(){
  this.render('settings');
})
