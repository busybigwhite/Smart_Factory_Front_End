var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var rename = require('gulp-rename');
var glob = require('glob');
var minifyCss = require('gulp-minify-css');

var base = 'public/';

var paths = {
	mainLess: base + 'styles/less/style.less',
    mainCssDir: base + 'styles',
    cssGlob: base + 'styles/*.css',
	destDir: base + 'build',
	destCssDir: base + 'build',
	jsGlob: base + 'scripts/pages/*.js',
	destJsDir: base + 'build/bundle',
	destJsGlob: base + 'build/bundle/*.js'
};

gulp.task('connect', function () {
	connect.server({livereload: true});
});

gulp.task('pre-build-less', function () {
  	gulp.src(paths.mainLess)
    	.pipe(less())
    	.pipe(gulp.dest(paths.mainCssDir))
});

gulp.task('less', [ 'pre-build-less' ], function() {
    gulp.src(paths.cssGlob)
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.destCssDir))
        .pipe(connect.reload());
});

gulp.task('bundle', function(done) {
    glob(paths.jsGlob, function(err, files) {
        if(err) done(err);

        files.map(function(entry) {
        	return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({dirname: ""}))
                .pipe(gulp.dest(paths.destJsDir))
	    		.pipe(connect.reload());
        });
    })
});

gulp.task('watch', function () {
	gulp.watch(paths.mainLess, ['less']);
	gulp.watch(paths.jsGlob, ['bundle']);
});

gulp.task('default', ['connect', 'watch']);
