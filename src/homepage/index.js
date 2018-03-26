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
      'liked': false
    },

    {
      'user': {
        'username': 'elkin',
        'avatar': 'perfil1.jpg'
      },
      'url': 'flor.jpg',
      'likes': 10 ,
      'liked': true
    }
  ]
  empty(main).appendChild(template(pictures));
})