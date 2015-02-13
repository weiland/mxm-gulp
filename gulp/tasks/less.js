var gulp                 = require('gulp');
var less                 = require('gulp-less');
var using                = require('gulp-using');
var concat               = require('gulp-concat');
var cached               = require('gulp-cached');
var progeny              = require('gulp-progeny');
var remember             = require('gulp-remember');
var sourcemaps           = require('gulp-sourcemaps');
var options              = require('../options').less;
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var lessPluginCleanCSS   = require('less-plugin-clean-css');

var autoprefix = new lessPluginAutoprefix({browsers: options.browsers});
var cleancss = new lessPluginCleanCSS({advanced: true});

// Default task
gulp.task('default', ['less', 'watch']);

// Build task
gulp.task('less', function () {
	return setTimeout(build, 20);
});

// Watcher task
gulp.task('watch', function () {
	gulp.watch(glob, ['less'])
		.on('change', change);
});

function build () {
	gulp.src(options.src)
		.pipe(cached('less'))
		.pipe(progeny({
            regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        }))
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins:[autoprefix, cleancss]
		}))
		.on('error', function (err) { console.log(err); })
		.pipe(remember('css'))
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(options.dest));
}

function change (e) {
	console.log('watcher ' + e.type);
	if (e.type === 'deleted') {
		delete cached.caches.scripts[e.path];
		remember.forget('css', e.path);
	}
}
