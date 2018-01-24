var page = require('page');

page('/', function (ctx, next) {
  var main = document.getElementById('main-container');
  main.innerHTML = 'Home <a href="/Signup">Signup</a> Home <a href="/Signin">Signin</a>';
})
