# hiden-no-tare.web

([@pirosikick](https://github.com/pirosikick/))'s secret sauce for creating web application.

## Feature

- gulp
- webpack
  - babel-loader
- postcss
  - precss
  - autoprefixer
- browser-sync

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

- This task:
  - builds `.tmp/scripts/client.bundle.js` from `src/client.js` with browserify
  - compiles scss files(`app/styles/**/*.scss`) to css files(`.tmp/styles/**/*.css`)
  - launches web server on `localhost:3000` with browser-sync

#### npm test

- This task runs tests in `test/**/*.js`
  - mocha + power-assert

#### npm run watch

- This task:
  - watches and rebuilds JavaScript and CSS files.
  - reloads browser-sync when changing JavaScript files, Stylesheets and html files in `app` or `.tmp`.

#### npm run build

- (TODO)
- This task builds minified JavaScript and CSS files to `dist/` for production.

## License

[MIT](http://pirosikick.mit-license.org/)
