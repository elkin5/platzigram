var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');
var translate = require('../translate').message;
var request = require('superagent');


// los 2 botones uno para subir y otro para confirmar el cual estara oculto (hide)
module.exports = function (pictures) {
  var content = yo`<div class="container timeline">  

    <div id="modalCamera" class="modal modal-cam center-align">
      <div class="modal-content">
        <div class="camera-picture" id="camera-input"></div>
        <div class="camera-picture hide" id="picturePreview"></div>
      </div>  
      <div class="foot-modal">
        <button class="waves-effect waves-light btn" id="btnShootPicture">
          <i class="fas fa-camera-retro"></i>
        </button>
        <button class="waves-effect waves-light cyan btn hide" id="btnUploadPicture">
          <i class="fas fa-cloud-upload-alt"></i>
        </button>
        <button class="waves-effect waves-light red btn hide" id="btnCancelPicture">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
        <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
          <a class="waves-effect waves-light btn modal-trigger" id="btnModal" href="#modalCamera">
            <i class="fas fa-camera-retro"></i>
          </a>
          <div id="pictureName" class="pictureUpload btn btn-flat cyan">
            <span>
              <i class="fas fa-cloud-upload-alt"></i> ${translate('upload-picture')}
            </span>
            <input type="file" name="picture" id="file" class="upload" onchange=${onchange}>
          </div>  
          <button type="submit" id="btnUpload" class="btn btn-flat cyan hide">
            ${translate('upload')}
          </button>
          <button type="button" id="btnCancel" class="btn btn-flat red hide" onclick=${cancel}>
            <i class="fas fa-times"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m10 offset-m1 l6 offset-l3" id="picture-cards">
        ${pictures.map(function (pic) {
          return picture(pic);
        })}
      </div>
    </div>
  </div>`;

  function toggleButtons() {
    document.getElementById('pictureName').classList.toggle('hide');
    document.getElementById('btnUpload').classList.toggle('hide');
    document.getElementById('btnCancel').classList.toggle('hide');
  }
  // cuando va a hacer cancel entoncess debe hacer lo mismo con el boton
  function cancel() {
    //debugger; sirve para poner un break point
    toggleButtons();
    //ademas debo de formatear el form
    document.getElementById('formUpload').reset();
  }

  // lo que va a hacer es cambiarle el hide a los botones
  function onchange() {
    toggleButtons();    
  }

  // todos los eventos on reciben un evento aunque n el oncj=hange se esta omitiendo
  function onsubmit(ev) {
    ev.preventDefault(); // detiene el llamdo automatico de el action y la ejecucion

    // cuando se dispara un evento se tiene por this el que disparo el evento en este sao sera el form
    var data = new FormData(this);
    // los siguiente es hacer llegar los datos al servidor. se usa superagent.
    request
      .post('/api/pictures')
      .send(data)
      .end((err, res) => console.log(arguments))
  }

  return layout(content);
}

