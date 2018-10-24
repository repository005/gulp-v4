'use strict';

var gulp = require ('gulp'),
    gcmq = require('gulp-group-css-media-queries'),
    glp  = require('gulp-load-plugins')();

gulp.task('pug', function() {
  return gulp.src('src/pug/*.pug')
    .pipe(glp.plumber({
      errorHandler: glp.notify.onError(function(err){
        return{
          title: 'PUG error',
          message:err.message
        };
      })
    }))
    .pipe(glp.pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('sass', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(glp.plumber({
      errorHandler: glp.notify.onError(function(err){
        return{
          title: 'SASS error',
          message:err.message
        };
      })
    }))
    .pipe(glp.sass())
    .pipe(glp.autoprefixer([
      'last 10 versions'
    ]))
    .pipe(gcmq())
    .pipe(glp.csscomb())
    // .pipe(gulp.dest('build/css'))
    .pipe(glp.csso({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(glp.rename({
      extname: '.min.css'
    }))
    .pipe(glp.sourcemaps.write())
    .pipe(gulp.dest('build/css'))
});

gulp.task('watch', function() {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series(gulp.parallel('pug', 'sass', 'watch')));