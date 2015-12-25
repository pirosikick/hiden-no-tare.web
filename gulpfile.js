'use strict';
const gulp = require('gulp');
const named = require('vinyl-named');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
$.webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const src = {
  webpack: ['src/client.js']
};

gulp.task('default', ['start']);
gulp.task('start', ['start-server', 'webpack:watch']);

gulp.task('start-server', done => {
  browserSync.init({
    server: {
      baseDir: ['.tmp', 'dist', 'public'],
    },
    files: [
      '.tmp/**/*.{js,css}',
      'dist/**/*.{js,css}',
      'public/**/*.{html,js,css,jpeg,jpg,png,gif,svg}'
    ]
  });
});

gulp.task('webpack', [], () => {
  return gulp.src(src.webpack)
    .pipe(named())
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('webpack:watch', [], () => {
  const config = Object.assign(webpackConfig, { watch: true });
  return gulp.src(src.webpack)
    .pipe(named())
    .pipe($.webpack(config))
    .pipe(gulp.dest('.tmp/scripts'));
});
