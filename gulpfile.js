
var gulp = require('gulp');
var browserSync = require('browser-sync');

var shell = require('gulp-shell');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll serve']));

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build'], { stdio: 'inherit' })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', gulp.series('jekyll-build'), function () {
    browserSync.reload();
});



/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/sass/style.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('assets/css'));
});


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', gulp.series('sass', 'jekyll-build'), function () {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', gulp.series('sass'));
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], gulp.series('jekyll-rebuild'));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series('browser-sync', 'watch'));