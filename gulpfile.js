const {watch, src, dest, series, parallel } = require("gulp");
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
    styles: {
      src: 'src/sass/**/*.scss',
      dest: 'assets/css/'
    },
    scripts: {
      src: 'src/js/**/*.js',
      dest: 'assets/js/'
    }
  };

function CSS(cb) {
    src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(cleanCSS())
        .pipe(dest(paths.styles.dest));
    cb();
}
function JS(cb) {
    src(paths.scripts.src)
        .pipe(uglify())
        .pipe(dest(paths.scripts.dest));
    cb();
}


function watchFiles (cb){
    watch(paths.styles.src, CSS);
    watch(paths.scripts.src, JS);
}

  module.exports.default = series(
    parallel(CSS,JS),
    watchFiles
  )
  module.exports.build = series(
    parallel(CSS,JS)
  )