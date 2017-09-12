const gulp = require('gulp');
const sass = require('gulp-sass');
const strip = require('gulp-strip-comments');
const browser = require('gulp-browser');

gulp.task('default', ['html', 'css', 'js']);

gulp.task('html', () => {
  gulp.src('*.html')
  .pipe(strip())
  .pipe(gulp.dest('docs/'))
});

gulp.task('css', () => {
  gulp.src('*.scss')
  .pipe(sass())
  .pipe(strip.text())
  .pipe(gulp.dest('docs/'))
});

gulp.task('js', () => {
  gulp.src('*.js')
  .pipe(browser.browserify())
  .pipe(strip())
  .pipe(gulp.dest('docs/'))
});

gulp.task('watch', ['default'], () => {
  gulp.watch('*.html', ['html']);
  gulp.watch('*.scss', ['css']);
  gulp.watch('*.js', ['js']);
});
