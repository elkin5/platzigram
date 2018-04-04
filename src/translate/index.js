// para esto debe haberse instalado intl y mediante el siguiente if valido si existe el objeto
// para que funcione la lireria intl que no esta definida en este browser
if (!window.Intl) { // si el objeto es null o undefined entonces la condicion es falsa y si se niega queda verdadera.
  window.Intl = require('intl');
  require('intl/locale-data/jsonp/en-US');
  require('intl/locale-data/jsonp/es');
}

var IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat'); //declaracion en el objeto global
var IntlMessageFormat = require('intl-messageformat');

require('intl-relativeformat/dist/locale-data/en.js');
require('intl-relativeformat/dist/locale-data/es.js');

var rf = new IntlRelativeFormat('es');
var es = require('./es');
var en = require('./en-US');

var MESSAGES = {}; // declaracion de un objeto vacio
MESSAGES.es = es; // asignacion de una propiedad al objeto
MESSAGES['en-US'] = en; // asignacion de una propiedad que contiene espacios o caracteres especiales

var locale = 'en-US';

module.exports = {
  message: function (text, opts = {}) {
    opts = opts || {}; // a opts le asignamos lo que venga o un objeto vacio. 
    var msg = new IntlMessageFormat(MESSAGES[locale][text], locale, null);
    return msg.format(opts);
  },
  date: new IntlRelativeFormat(locale)
}

