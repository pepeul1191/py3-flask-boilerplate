var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify");
var concatCss = require("gulp-concat-css");
var concatJs = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var replace = require("gulp-replace");
var plumber = require("gulp-plumber");
var watch = require("gulp-watch");
var BASE_URL = "http://localhost:9090/";
var DESTINO = "dist/";
var MEDIA = ""

function errorLog(error){
  console.error.bind(error);
  this.emit("end");
}

gulp.task("fonts", function(){
  gulp.src([
    MEDIA + 'bower_components/font-awesome/fonts/*',
    MEDIA + 'bower_components/bootstrap/fonts/*',
  ])
  .pipe(gulp.dest(DESTINO));
});

gulp.task("login", function(){
  //JS
  //FONTS
  //CSS
  gulp.src([
    MEDIA + "bower_components/bootstrap/dist/css/bootstrap.min.css",
    MEDIA + "bower_components/font-awesome/css/font-awesome.min.css",
    MEDIA + "assets/css/styles.css",
    MEDIA + "assets/css/login.css",
  ])
  .pipe(plumber())
  .pipe(concatCss("login-min.css"))
  .pipe(replace("../../../font-awesome/fonts/", BASE_URL + "dist/"))
  .pipe(replace("../fonts/glyphicons", "glyphicons"))
  .pipe(minifyCss())
  .pipe(gulp.dest(DESTINO));
});

gulp.task("contenido", function(){
  //JS
  gulp.src([
    MEDIA + "bower_components/jquery/dist/jquery.min.js",
    MEDIA + "bower_components/bootstrap/dist/js/bootstrap.min.js",
    MEDIA + "bower_components/handlebars/handlebars.min.js",
    MEDIA + "bower_components/underscore/underscore-min.js",
    MEDIA + "bower_components/backbone/backbone-min.js",
    MEDIA + "bower_components/backbone.marionette/lib/backbone.marionette.min.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools-core.min.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.min.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools-interfaces.min.js",
    MEDIA + "bower_components/swp-plugins/assets/js/jquery.upload.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.chain.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.dao.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.autocomplete.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.form.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.observer.js",
    MEDIA + "bower_components/swp-plugins/assets/js/mootools.grid.js",
    MEDIA + "bower_components/swp-plugins/assets/js/jquery.upload.js",
    MEDIA + "bower_components/jquery-ui/ui/widgets/datepicker.js",
    MEDIA + "bower_components/jquery-timepicker-wvega/jquery.timepicker.js",
    MEDIA + "assets/js/vanillaCalendarModel.js",
    MEDIA + "assets/js/vanillaCalendar.js",
    MEDIA + "models/ambiente.js",
    MEDIA + "models/servicio.js",
    MEDIA + "models/teatro.js",
    MEDIA + "models/exposicion.js",
    MEDIA + "models/concierto.js",
    MEDIA + "models/stand_up.js",
    MEDIA + "layout/app.js",
    MEDIA + "views/_table_ambiente_galeria.js",
    MEDIA + "views/_table_ambiente.js",
    MEDIA + "views/ambiente_detalle.js",
    MEDIA + "views/ambiente.js",
    MEDIA + "views/_table_concierto.js",
    MEDIA + "views/concierto_detalle.js",
    MEDIA + "views/concierto.js",
    MEDIA + "views/_table_exposicion.js",
    MEDIA + "views/exposicion_detalle.js",
    MEDIA + "views/exposicion.js",
    MEDIA + "views/_table_servicio.js",
    MEDIA + "views/servicio_detalle.js",
    MEDIA + "views/servicio.js",
    MEDIA + "views/_table_stand_up.js",
    MEDIA + "views/stand_up_detalle.js",
    MEDIA + "views/stand_up.js",
    MEDIA + "views/_table_teatro_elenco.js",
    MEDIA + "views/_table_teatro_equipo.js",
    MEDIA + "views/_table_teatro.js",
    MEDIA + "views/teatro_detalle.js",
    MEDIA + "views/teatro.js",
    MEDIA + "routes/contenido.js",
  ])
  .pipe(concatJs("contenido.js"))
  .pipe(minify({
      ext:{
        //src:"libs.js",
        //min:"min.js"
      },
      exclude: [],
      ignoreFiles: []
    })
  )
  .pipe(plumber())
  .pipe(gulp.dest(DESTINO));
  //FONTS
  //CSS
  gulp.src([
    MEDIA + "bower_components/bootstrap/dist/css/bootstrap.min.css",
    MEDIA + "bower_components/font-awesome/css/font-awesome.min.css",
    MEDIA + "bower_components/swp-plugins/assets/css/mootools.autocomplete.css",
    MEDIA + "bower_components/swp-plugins/assets/css/mootools.grid.css",
    MEDIA + "bower_components/swp-plugins/assets/css/mootools.validations.css",
    MEDIA + "bower_components/jquery-ui/themes/base/datepicker.css",
    MEDIA + "bower_components/jquery-timepicker-wvega/jquery.timepicker.css",
    MEDIA + "assets/css/vanillaCalendar.css",
    MEDIA + "assets/css/styles.css",
  ])
  .pipe(plumber())
  .pipe(concatCss("contenido-min.css"))
  .pipe(replace("../../../font-awesome/fonts/", BASE_URL + "dist/"))
  .pipe(replace("../fonts/glyphicons", "glyphicons"))
  .pipe(minifyCss())
  .pipe(gulp.dest(DESTINO));
});
