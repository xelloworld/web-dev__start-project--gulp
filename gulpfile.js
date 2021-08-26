const {src, dest, parallel, series, watch} = gulp;

import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-htmlmin';

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
}

// Default
export default series(
  parallel(
    html
  )
);
