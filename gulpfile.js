const { src, dest, watch, parallel, series, done } = require('gulp'),
        nunjucks     = require('gulp-nunjucks'),
        browserSync  = require('browser-sync').create()

const Paths = {
  DIST        : 'dist',

  SRC_HTML     : 'src/html/*.html',
  WATCH_HTML   : 'src/html/**/*.{html,njk}',

  SRC_CSS     : 'src/css/*.css',
  DIST_CSS    : 'dist/css',
}

// nunucks html
const html = () => {
  return src(Paths.SRC_HTML)
    .pipe(nunjucks.compile({}))
    .pipe(dest(Paths.DIST))
    .pipe(browserSync.stream())
}


function watchers() {
  browserSync.init({
    server: {
      baseDir: Paths.DIST,
    },
    ui: {
      port: 8080
    },
    notify: false
  })

  watch(Paths.WATCH_HTML, html)
  watch('dist/**/*.*').on('change', browserSync.reload)
}

exports.html        = html
exports.watchers    = watchers

exports.default = series(parallel(html), watchers)
