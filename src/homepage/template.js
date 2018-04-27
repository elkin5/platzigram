var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');
var translate = require('../translate').message;


// los 2 botones uno para subir y otro para confirmar el cual estara oculto (hide)
module.exports = function (pictures) {
  var content = yo`<div class="container timeline">
    <div class="row">
      <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
        <form enctype="multipart/form-data" class="form-upload" id="formUpload">
          <div id="pictureName" class="pictureUpload btn btn-flat cyan">
            <span>
              <i class="fas fa-camera-retro"></i> ${translate('upload-picture')}
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
      <div class="col s12 m10 offset-m1 l6 offset-l3">
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

  return layout(content);
}

