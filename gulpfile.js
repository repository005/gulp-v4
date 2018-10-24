'use strict';

var gulp = require ('gulp'),
    gcmq = require('gulp-group-css-media-queries'),
    browserSync = require('browser-sync').create(),
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
    .pipe(gulp.dest('build'))
    .on('end', browserSync.reload)
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
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
});

gulp.task('default', gulp.series(
  gulp.parallel('pug', 'sass'),
  gulp.parallel('watch', 'serve')
));