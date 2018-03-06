var page = require('page');
var empty = require('empty-element');
var template = require('./template');

page('/', function (ctx, next) {
  var main = document.getElementById('main-container');

  var pictures = [
    {
      'user': {'username': 'mesa',
              'avatar': 'perfil2.jpg'},
      'url': 'office.jpg',
      'likes': 2,
      'liked': true
    },

    {
      'user': {
        'username': 'elkin',
        'avatar': 'perfil1.jpg'
      },
      'url': 'flor.jpg',
      'likes': 10 ,
      'liked': false
    }
  ]
  empty(main).appendChild(template(pictures));
})