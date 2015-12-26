#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const directries = [
  'public',
  'src',
  'src/styles',
  'test'
];

directries
  .filter(path => {
    try {
      fs.accessSync(path);
    } catch (e) {
      return true;
    }
    return false;
  })
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

files
  .map(file => ({
    src: path.join(__dirname, file),
    dest: path.join(process.cwd(), file)
  }))
  .map(file => {
    fs.createReadStream(file.src).pipe(fs.createWriteStream(file.dest));
  });
