var assets = 'test/output'; // Relative to gulpfile.js
var webassets = '/project/media/Assets'; // Relative to webroot

module.exports = {

	// Project name
	name: 'mxm-gulp',

	// Less settings
	less: {
		src: 'test/less/**/*.less', // Relative to gulpfile.js
		dest: assets + '/css',
		autoprefix: [
			'Android >= 2.3',
			'Chrome >= 20',
			'Firefox >= 24', // Firefox 24 is the latest ESR
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		],
		sourceMapRoot: webassets + '/css/' // Relative to web root
	},

	// Browserify settings
	js: {
		bundles: [
			{
				src: './test/js/autor.js' // Relative to gulpfile.js
			}
		],
		dest: './x'
	},

	// Jade settings
	jade: {
		src: 'test/jade/**/*.jade', // Relative to gulpfile.js
		views: 'test/jade/views/**/*.jade', // Relative to gulpfile.js
		dest: assets, // Relative to gulpfile.js
		minify: false
	},

	iconfont: {
		src: 'test/svg/**/*.svg', // Relative to gulpfile.js
		dest: assets + '/fonts',
		name: 'fonticons',
		class: 'gfx',
		template: 'gulp/utils/iconfont-template.less', // Relative to gulpfile.js
		lessDest: 'test/less/', // Relative to gulpfile.js
		rootPath: webassets + '/fonts/' // Relative to web root
	}
}
