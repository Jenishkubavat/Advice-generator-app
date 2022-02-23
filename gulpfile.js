// initialize module
const {src ,dest,watch, series,parallel}= require('gulp');
const  autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browsersync = require('browser-sync').create();

// file path variables
const files={
    sassPath: './app/scss/**/*.scss',
    jsPath: './app/js/**/*.js'
};
// sass  task
function sassTask(){
    return  src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'));
}
// javascript  task
function javascriptTask(){
    return src(files.jsPath)
    .pipe(concat('final.js'))
    .pipe(uglify())
    .pipe(dest('dist'));
    
}
// cachebusting  task
function cacheBustingTask(){
    const cbstring= new Date().getTime();
    return src('./index.html')
    .pipe(replace(/cb=\d+/g, 'cb='+cbstring))
    .pipe(dest('.'));
}

// browser sync
function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }
    });
    cb();
  }
  
  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }


  //watch task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(sassTask, javascriptTask, browsersyncReload));
}


// defualt  task
exports.default = series(
    parallel(javascriptTask,sassTask),
    cacheBustingTask,
    browsersyncServe,
    watchTask
);

  