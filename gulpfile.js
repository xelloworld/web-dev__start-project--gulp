import gulp from 'gulp';
import del from 'del';
import htmlMin from 'gulp-htmlmin';
import fileInclude from 'gulp-file-include';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMedia from 'gulp-group-css-media-queries';
import nodeSass from 'sass';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';

const {
  src,
  dest,
  parallel,
  series,
  watch,
} = gulp;
const sass = gulpSass(nodeSass);

// Clean

export const cleanBuild = () => del('build');

// HTML

export const buildHtml = () => (
  src('src/html/pages/*.html')
    .pipe(fileInclude({
      prefix: '@',
    }))
    .pipe(htmlMin({
      removeComments: true,
      // collapseWhitespace: true,
      // preserveLineBreaks: true
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream())
);

// Styles

export const buildStyle = () => (
  src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      grid: true,
    }))
    .pipe(groupCssMedia())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream())
);

// Scripts

export const buildScripts = () => (
  src('src/js/*.js')
    .pipe(fileInclude({
      prefix: '=>>',
    }))
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream())
);

// Browsersync

export const liveServer = () => {
  browserSync.init({
    server: {
      baseDir: 'build',
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false,
    },
    notify: false,
    open: false,
    online: true,
  });
  watch('src/html/**/*.html', buildHtml);
  watch('src/scss/**/*.scss', buildStyle);
  watch('src/js/**/*.js', buildScripts);
};

// Default

export default series(
  cleanBuild,
  parallel(
    buildHtml,
    buildStyle,
    buildScripts,
  ),
  liveServer,
);
