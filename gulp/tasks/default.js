var gulp = require('gulp');
var exec = require('child_process').exec;
var options = require('../options');

exec('title ' + options.name);

try{

gulp.task('default', ['dev', 'watch']);
}catch(err){
	console.log(err);
}