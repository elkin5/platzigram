var yo = require('yo-yo');
var landing = require('../landing');
var translate = require('../translate');

var signinForm = yo`<div class="col s12 m7">
              <div class="row">
                <div class="signup-box">      
                  <h1 class="platzigram">Platzigram</h1>
                  <form class="signup-form">
                    <div class="section">                      
                      <a class="btn btn-fb hide-on-small-only"> ${translate.message('signup.btn-fb-login-lg')}</a>
                      <a class="btn btn-fb hide-on-med-and-up"><i class="fab fa-facebook"></i>
                      ${translate.message('signup.btn-fb-login-md')}</a>
                    </div>
                    <div class="divider"></div>
                    <div class="section">
                      <input type="text" name="username" placeholder="${translate.message('username')}">
                      <input type="password" name="password" placeholder="${translate.message('password')}">
                      <button class="btn waves-effect waves-ligth btn-signup" type="submit">${translate.message('signin')}</button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="row">
                <div class="login-box">
                  ${translate.message('signup.not-have-account')}
                  <a href="/signup">${translate.message('signup.btn-signup')}</a>
                </div>
              </div>             
            </div>`

module.exports = landing(signinForm);
