var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var glob = require('glob');

var base = 'public/';

var paths = {
	mainLess: base + 'styles/less/style.less',
	destDir: base + 'build',
	destCssDir: base + 'build',
	destCssFile: base + 'build/style.css',
	jsGlob: base + 'scripts/pages/*.js',
	destJsDir: base + 'build/bundle',
	destJsGlob: base + 'build/bundle/*.js'
};

gulp.task('connect', function () {
	connect.server({livereload: true});
});

gulp.task('less', function () {
  	gulp.src(paths.mainLess)
    	.pipe(less())
    	.pipe(gulp.dest(paths.destCssDir))
    	.pipe(notify('v Build Less Success v'))
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
                .pipe(notify('v Build JavaScript Success v'))
	    		.pipe(connect.reload());
        });
    })
});

gulp.task('watch', function () {
	gulp.watch(paths.mainLess, ['less']);
	gulp.watch(paths.jsGlob, ['bundle']);
});

gulp.task('default', ['connect', 'watch']);
