var express = require('express');

var app = express();

//cuando se acceda a dicha ruta se ejecute esa funcion
app.get('/', function (req, res) {
    res.send('Hola Mundo');
})

//Se pone el puerto donde se ejecuta y es posible tambien la url, y la funcion en la cual se va a ejecutar si no se ejecuta bien
app.listen(3000, function (err) {
    if (err) return console.log('Hubo un error'), process.exit(1);

    console.log('Platzigram escuchando en el puerto 3000')
})