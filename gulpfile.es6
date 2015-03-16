'use strict';

import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import lazypipe from 'lazypipe';
import browserSync, { reload } from 'browser-sync';

let $ = gulpLoadPlugins();

let pathes = {
  scripts: './src/**/*.js',
  tests: './test/**/*.js',
};

let dests = {
  scripts: './.tmp/scripts/'
}

let entries = [
  // ex) { src: './src/client.js', bundle: 'client.bundle.js' }
  { src: './src/client.js', bundle: 'client.bundle.js' }
]

const SERVER_PORT = 9000

gulp.task('watchify', () => {
  let _compile = _.partial(compile, _, { watch: true });
  return merge(entries.map(_compile));
});

gulp.task('browserify', () => {
  return merge(entries.map(compile))
});

gulp.task('scripts', () => {
  gulp.src(pathes.scripts)
    .pipe($.babel())
    .pipe(gulp.dest('./lib'));
});

gulp.task('test', function () {
  gulp.src(pathes.tests)
    .pipe($.mocha());
});

gulp.task('startServer', [], () => {
  $.nodemon({
    script: './lib/server.js',
    env: { 'NODE_PORT': SERVER_PORT }
  })
});

gulp.task('browserSync', [], () => {
  browserSync({
    proxy: `localhost:${SERVER_PORT}`
  });
});

gulp.task('build', ['scripts', 'browserify']);

gulp.task('watch', () => {});

gulp.task('default', ['build', 'watch']);

function compile (entry, opts = {}) {
  let bundler, bopts;
  let _opts = {
      watch: false
    , minify: false
    , debug: true
    , dest: dests.scripts
  };

  opts = _.assign(_opts, opts);
  bopts = { debug: !!opts.debug };

  if (opts.watch) {
    bundler = watchify(browserify(entry.src, _.assign(bopts, watchify.args)));
    bundler.on('log', $.util.log);
  } else {
    bundler = browserify(entry.src, bopts);
  }

  function bundle () {
    return bundler
      .bundle()
      .on('error', (e) => $.util.log(e.message))
      .pipe($.duration(`changed ${entry.bundle}`))
      .pipe(source(entry.bundle))
      .pipe(buffer())
      .pipe($.if(opts.minify, $.uglify()))
      .pipe(gulp.dest(opts.dest));
  }

  bundler.on('update', bundle);

  return bundle();
}
