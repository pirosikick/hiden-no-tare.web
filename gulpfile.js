'use strict';
const gulp = require('gulp');
const named = require('vinyl-named');
const run = require('run-sequence');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
$.webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const src = {
  webpack: ['src/client.js'],
  css: ['src/styles/**/*.{css,scss}']
};
const tmp = {
  js: '.tmp/scripts',
  css: '.tmp/styles'
}

gulp.task('default', ['start']);
gulp.task('start', done => {
  run('clean', ['start-server', 'watch'], done);
});
gulp.task('watch', ['webpack:watch', 'postcss:watch']);


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
    .pipe(gulp.dest(tmp.js));
});

gulp.task('webpack:watch', ['clean'], () => {
  const config = Object.assign(webpackConfig, { watch: true });
  return gulp.src(src.webpack)
    .pipe(named())
    .pipe($.webpack(config))
    .pipe(gulp.dest(tmp.js));
});

gulp.task('postcss', () => {
  const plugins = [
    require('autoprefixer'),
    require('precss')
  ];
  return gulp.src(src.css)
    .pipe($.sourcemaps.init())
    .pipe($.postcss(plugins))
    .pipe($.sourcemaps.write())
    .pipe($.rename({ extname: '.css' }))
    .pipe(gulp.dest(tmp.css));
});

gulp.task('postcss:watch', ['postcss'], () => {
  gulp.watch(src.css, ['postcss']);
});

gulp.task('clean', done => {
  return gulp.src('.tmp').pipe($.clean());
});
