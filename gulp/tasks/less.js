var gulp                 = require('gulp');
var less                 = require('gulp-less');
var using                = require('gulp-using');
var concat               = require('gulp-concat');
var cached               = require('gulp-cached');
var changed              = require('gulp-changed');
var progeny              = require('gulp-progeny');
var remember             = require('gulp-remember');
var sourcemaps           = require('gulp-sourcemaps');
var options              = require('../options').less;
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var lessPluginCleanCSS   = require('less-plugin-clean-css');

var browsers = [
	'Android >= 2.3',
	'Chrome >= 20',
	'Firefox >= 24', // Firefox 24 is the latest ESR
	'Explorer >= 8',
	'iOS >= 6',
	'Opera >= 12',
	'Safari >= 6'
];
var autoprefix = new lessPluginAutoprefix({browsers: browsers});
var cleancss = new lessPluginCleanCSS({});

// Default task
gulp.task('default', ['less', 'watch']);

// Build task
gulp.task('less', function () {
	return setTimeout(function () {
	gulp.src(options.src)
		.pipe(cached('less'))
		.pipe(using({prefix: 'input'}))
		.pipe(progeny({
            regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        }))
		.pipe(sourcemaps.init())
		.pipe(less({plugins:[autoprefix, cleancss]}))
		.on('error', function (err) { console.log(err); })
		.pipe(using({prefix: 'compiled'}))
		.pipe(remember('css'))
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(options.dest));
	}, 20);

});

// Watcher task
gulp.task('watch', function () {
	var watcher = gulp.watch(glob, ['less']);
	watcher.on('change', function (e) {
		if (e.type === 'deleted') {
			delete cached.caches.scripts[e.path];
			remember.forget('css', e.path);
		}
	});
});