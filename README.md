# hiden-no-tare.web

hiden-no-tare.web is a project template of client-side web application development for me([@pirosikick](https://github.com/pirosikick/)).

## Feature

- use browserify
- write JavaScript for application and test with ES6
    - babelify for app codes
    - espower-babel for test codes
- write css with node-sass

## Usage

### Setup

```sh
# clone this repositry with new project name
$ git clone https://github.com/pirosikick/hiden-no-tare.web.git your-project
$ cd your-project

# git init this repositry as new git repositry
$ rm -rf .git README.md
$ git init

# install dependencies
$ npm install
```

### Npm scripts

All tasks are defined in package.json as npm scripts.

#### npm run start

- this task:
  - builds `src/client.js` as `client.bundle.js` with browserify
  - compiles scss files to css files
  - launches web server on `localhost:3000` with browser-sync

#### npm test

- this task runs tests

#### npm run watch

#### npm run build

## License

[MIT](http://pirosikick.mit-license.org/)
