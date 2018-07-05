var page = require("page");
var empty = require("empty-element");
var template = require("./template");
var request = require("superagent");
var headerMiddleware = require('../header');
var requestAxios = require('axios');
import webcam from "webcamjs";
import picture from "../picture-card";

// funcion que va a agregar las pictures al dom
page("/", headerMiddleware, asyncLoad, function (ctx, next) {
  var main = document.getElementById("main-container");

  empty(main).appendChild(template(ctx.pictures));

  const picturePreview = $('#picturePreview');
  const cameraInput = $('#camera-input');
  const btnShoot = $('#btnShootPicture');
  const btnUpload = $('#btnUploadPicture');
  const btnCancel = $('#btnCancelPicture');

  //propiedades de la webcam
  webcam.set({
    width: 640,
    height: 480,
    dest_width: 640,
    dest_height: 480,
    image_format: 'jpeg',
    jpeg_quality: 90,
    force_flash: false,
    flip_horiz: true,
    fps: 30
  });  

  //funcion para poner los div al estado de inicio antes de tomar la foto
  function reset() {
    picturePreview.addClass('hide');
    btnCancel.addClass('hide');
    btnUpload.addClass('hide');
    btnShoot.removeClass('hide');
    cameraInput.removeClass('hide');
  }

  // cuando se da en el boton cancelar ejecuta la funcion reset
  btnCancel.click(reset);

  //Se ejecuta despues de listo el dom
  $(function () {

    $("#btnModal").click(function () {
      $('.modal').modal({
        ready: function () {
          webcam.attach('#camera-input');
          btnShoot.click((ev) => {
            webcam.snap((data_uri) => {
              //ahora vamos a poner el elmento aca con jquery
              picturePreview.html(`<img src="${data_uri}"/>`);
              picturePreview.removeClass('hide');
              btnCancel.removeClass('hide');
              btnUpload.removeClass('hide');
              btnShoot.addClass('hide');
              cameraInput.addClass('hide');
              btnUpload.off("click");
              btnUpload.click(() => {
                const pic = {
                  url: data_uri,
                  likes: 0,
                  liked: false,
                  dateCreated: +new Date(),
                  user: {
                    username: "elkin",
                    avatar: "perfil1.jpg"
                  }
                }

                $('#picture-cards').prepend(picture(pic));
                reset();
                $(".modal").modal("close", "#modalCamera");
              });
            });
          })
        }, 
        complete: function () {
          webcam.reset();
          reset();
        }
      });    
    });
    
  });

});

function uploadPicture(data_uri) {
  
}

// funcion que cargara las pictures desde el servidor OPCION 1
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

//OPCION 2
function loadPicturesAxios(ctx, next) {

  requestAxios
    .get("/api/pictures")
    .then((res) => {
      ctx.pictures = res.data;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
}

//OPCION 3
function loadPicturesFetch(ctx, next) {

  fetch("/api/pictures")
    .then(res => {
      return res.json();
    })
    .then(pictures => {
      ctx.pictures = pictures;
      next();
    })
    .catch(err => {
      console.log(err);
    });
}

//OPCION 3 estandar de ECMAscript
async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}
