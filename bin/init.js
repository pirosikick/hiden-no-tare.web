#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const basedir = path.resolve(__dirname, '..');

if (basedir === process.cwd()) {
  console.error('This script must not run in hiden-no-tare.web repository.');
  process.exit(1);
}

const exists = path => {
  try {
    fs.accessSync(path);
  } catch (e) {
    return false;
  }
  return true;
};

const directries = [
  'public',
  'src',
  'src/styles',
  'test'
];

directries
  .filter(path => !exists(path))
  .map(path => fs.mkdirSync(path));

const files = [
  'package.json',
  'README.md',
  'webpack.config.js',
  'src/client.js',
  'src/styles/main.css',
  'src/styles/_hello.css',
  'public/index.html',
  '.gitignore',
  'test/index.js'
];

files.map(file => {
  fs.createReadStream(path.join(basedir, file))
    .pipe(fs.createWriteStream(path.join(process.cwd(), file)));
});
