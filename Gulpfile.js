var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// recibe el nombre de la tarea y la funcion
// vamos a pedirle que coja un archivo y lo pase por el preprocesador de sass
gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('assets', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'))
})

function compile(watch) {
  var bundle = watchify(browserify('./src/index.js'));

  //le pedimos que lo procese con babel
  // y que generfe un bundle (resumen)
  function rebundle() {
    bundle
      .transform(babel)
      .bundle()
      .on('error', function (err) {
        console.log(err);
        this.emit('end');
      })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'))
  }

  if (watch) {
    bundle.on('update', function () {
      console.log('--> Bundling....');
      rebundle();
    })
  }

  rebundle();
}

gulp.task('build', function () {
  return compile();
})

gulp.task('watch', function () {
  return compile(true);
})

//Tarea por defecto, recible un array que puede ejecutar varias tareas
gulp.task('default', ['styles', 'assets', 'build'])