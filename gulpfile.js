var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('folders', function() {
	return gulp.src('*.*', {read:false})
		.pipe(gulp.dest('./app'))
		.pipe(gulp.dest('./app/css'))
		.pipe(gulp.dest('./app/js'))
		.pipe(gulp.dest('./app/fonts'))
		.pipe(gulp.dest('./app/img'))
		.pipe(gulp.dest('./app/img/ico'))
		.pipe(gulp.dest('./app/pug'))
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(gulp.dest('./dist/img'))
		.pipe(gulp.dest('./dist/img/ico'));
});

gulp.task('html', function(){
	return gulp.src('app/pug/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('precss', function(){
	return gulp.src('app/css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(
			['last 15 version', '> 1%'],
			{cascade: true }))
		.pipe(gulp.dest('dist/css'))
});