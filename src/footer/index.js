var yo = require('yo-yo');
var translate = require('../translate');

var el = yo`
  <footer class="site-footer">
  <div class="container">
    <div class="row">
      <div class="col s12 l3 center-align">
        <!-- Dropdown Trigger--><a href="#" data-activates="dropdown1" class="dropdown-button btn btn-flat">
          ${translate.message('languaje')}
        </a>
        <!-- Dropdown Structure-->
        <ul id="dropdown1" class="dropdown-content">
          <li><a href="#" onClick=${lang.bind(null, 'es')}>${translate.message('spanish')}</a></li>
          <li><a href="#" onClick=${lang.bind(null, 'en-US')}>${translate.message('english')}</a></li>
        </ul>
      </div>
      <div class="col s12 l3 push-l6 center-align">2017 © Platzigram</div>
    </div>
  </div>
</footer>`;

function lang(locale) {
  localStorage.locale = locale;
  location.reload();
  return false;
}

document.body.appendChild(el);