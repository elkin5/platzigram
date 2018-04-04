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
      'likes': 0,
      'liked': false,
      'dateCreated': new Date()
    },

    {
      'user': {
        'username': 'elkin',
        'avatar': 'perfil1.jpg'
      },
      'url': 'flor.jpg',
      'likes': 1 ,
      'liked': true,
      'dateCreated': new Date().setDate(new Date().getDate() - 10)
    }
  ]
  empty(main).appendChild(template(pictures));
})