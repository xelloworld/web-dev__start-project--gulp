const {src, dest, parallel, series, watch} = gulp;

import gulp from 'gulp';
import del from 'del';
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-htmlmin';
import browserSync from 'browser-sync';

// Clean

export const clean = () => {
  return del('build');
};

// HTML

export const html = () => {
  return src('src/html/pages/*.html')
    .pipe(fileInclude({
        prefix: '@',
    }))
    .pipe(htmlMin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

// Browsersync

export const server = () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    notify: false,
    open: false,
    online: true
  });
  watch('src/html/**/*.html', html);
}

// Default

export default series(
  clean,
  parallel(
    html
  ),
  server
);
