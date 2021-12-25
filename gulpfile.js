const { series, watch, src, dest, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const zip  = require('gulp-zip');
const sass = require('gulp-dart-sass');
const livereload = require('gulp-livereload');

function serve(done) {
	livereload.listen();
	done();
}

const handleError = (done) => {
	return function (err) {
		return done(err);
	};
};

function hbs(done) {
	pump([
		src(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs']),
		livereload()
	], handleError(done));
}

function js(done) {
	pump([
		src('assets/js/*.js', {sourcemaps: true}),
		uglify(),
		dest('assets/js/build', {sourcemaps: '.'}),
		livereload()
	], done());
}

function zipper(done) {
	var targetDir = 'dist/';
	var themeName = require('./package.json').name;
	var filename = themeName + '.zip';
	pump([
		src([
			'**',
			'!node_modules', '!node_modules/**',
			'!dist', '!dist/**'
		]),
		zip(filename),
		dest(targetDir)
	], done());
}

function css(done) {
	var filename = 'assets/sass/main.scss';
	var destination = 'assets/css/'
	
	pump([
		src(filename),
		sass(),
		dest(destination),
		livereload()
	], done());
}

const cssWatcher = () => watch('assets/sass/main.scss', css);
const jsWatcher = () => watch('assets/js/woc.js', js);
const hbsWatcher = () => watch(['*.hbs', '**/**/*.hbs', '!node_modules/**/*.hbs'], hbs);
const watcher = parallel(cssWatcher, jsWatcher, hbsWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
	