// SIRVE PARA CREAR SERVER Y LEVANTAR
var express = require("express");
// para subir una picture
var multer = require('multer');
var ext = require('file-extension');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname));
  }
});
var upload = multer({ storage: storage }).single('picture');

var app = express();

//Se le dice a la libreria express que procese las vistas con pug
app.set("view engine", "pug");

//Se declara las carpetas donde busca los recursos
app.use(express.static("public"));

// esto es a modo de ejemplo cuando necesito crear una accion adicional
function restrict(req, res, next) {
  if (req.user) return next;
  res.redirect("/signin");
}

//cuando se acceda a dicha ruta se ejecute esa funcion
// app.get('/', restrict, function (req, res) { //con esta forma se activa el restrict
app.get("/", function (req, res) {
  res.render("index", { title: "Platzigram" });
});

app.get("/signup", function (req, res) {
  res.render("index", { title: "Platzigram-Signup" });
});

app.get("/signin", function (req, res) {
  res.render("index", { title: "Platzigram-Signin" });
});

//Simula el acceso a BD
app.get("/api/pictures", function (req, res) {
  var pictures = [
    {
      user: {
        username: "mesa",
        avatar: "perfil2.jpg"
      },
      url: "office.jpg",
      likes: 0,
      liked: false,
      dateCreated: new Date()
    },

    {
      user: {
        username: "elkin",
        avatar: "perfil1.jpg"
      },
      url: "flor.jpg",
      likes: 1,
      liked: true,
      dateCreated: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  setTimeout(() => {
    res.send(pictures);
  }, 2000);
});

// middleware para subir la picture
app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "error uploading file");
    }
    res.send("File uploaded");
  })
});
//Se pone el puerto donde se ejecuta y es posible tambien la url, y la funcion en la cual se va a ejecutar 
// si no se ejecuta bien
app.listen(3000, function (err) {
  if (err) return console.log("Hubo un error"), process.exit(1);

  console.log("Platzigram escuchando en el puerto 3000");
});
