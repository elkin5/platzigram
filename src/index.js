var page = require('page');

var main = document.getElementById('main-container'); 

page('/', function (ctx, next) {
  main.innerHTML = 'Home <a href="/Signup">Signup</a> Home <a href="/Signin">Signin</a>';
})

page('/signup', function (ctx, next) {
  main.innerHTML = 'Signup <a href="/">Home</a>';
})

page('/signin', function (ctx, next) {
  main.innerHTML = 'Signin <a href="/">Home</a>';
})

page.start();