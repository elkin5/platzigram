var page = require("page");
var empty = require("empty-element");
var template = require("./template");
var request = require("superagent");
var headerMiddleware = require('../header');

// funcion que va a agregar las pictures al dom
page("/", headerMiddleware, loadPictures, function (ctx, next) {
  var main = document.getElementById("main-container");

  empty(main).appendChild(template(ctx.pictures));
});

// funcion que cargara las pictures desde el servidor
function loadPictures(ctx, next) {
  // existen diferentes maneras de hacer request, por ejemplo ajax con $.get o $.ajax enviando la ruta (/api/pictures)
  request
    .get("/api/pictures") // se utiliza si es un get post put
    //.send({ name: "Manny", species: "cat" }) // parametros
    //.set("X-API-Key", "foobar") // cabeceras
    //.set("accept", "json") // cabeceras
    .end((err, res) => {
      // callback que me permite tratar la respuesta
      if (err) return console.log(err); // por convencion se recibe primero el error y se trata
      ctx.pictures = res.body; //ctx es el contexto que tiene ese request que se hace desde el lado del cliente y body contiene los datosde la respuesta
      next(); // una vez se tengan las pictures llamamos a next
    });
}
