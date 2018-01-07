var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

// recibe el nombre de la tarea y la funcion
// vamos a pedirle que coja un archivo y lo pase por el preprocesador de sass
gulp.task('styles', function () {
    gulp
        .src('index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('resources/css'))
})

//Tarea por defecto, recible un array que puede ejecutar varias tareas
gulp.task('default', ['styles'])