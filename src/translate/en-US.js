// es aca donde se van a poner todos los textos y es donde vamos a exportar ese objeto

module.exports = {
  // en este caso decimos que es un plural porque vamos a operar sobre los distintos valores de un numero
  likes: '{ likes, plural, ' +
         '=0 { no likes }' +
         '=1 { # like }' +
         'other { # likes }}' 
}