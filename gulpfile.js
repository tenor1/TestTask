var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		newer = require('gulp-newer'),
		changed = require('gulp-changed'),
		sync = require('gulp-npm-script-sync'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload;
		
sync(gulp);

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
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('html', function(){
	return gulp.src('app/pug/*.pug')
		.pipe(changed('dist', {extension: '.html'}))
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream:true}));
});

gulp.task('sass', function(){
	return gulp.src('app/css/*.scss')
		.pipe(changed('dist/css', {extension: '.css'}))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(
			['last 15 version', '> 1%'],
			{cascade: true }))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({stream:true}));
});

gulp.task('ico', function(){
	return gulp.src('app/*.ico')
		.pipe(changed('dist', {extension: '.ico'}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream:true}));
});


gulp.task('img', function(){
	return gulp.src(['app/img/**/*.*'])
		.pipe(changed('dist/img', {extension: '.*'}))
		.pipe(gulp.dest('dist/img'))
		.pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {baseDir: "dist"}
  });
});

gulp.task('watcher',function(){
  gulp.watch('app/css/*.*', gulp.series('sass'));
  gulp.watch('app/img/**/*.*', gulp.series('img'));
  gulp.watch('app/pug/*.pug', gulp.series('html'));
});

gulp.task('code', gulp.parallel('html','sass','img', 'ico'));

gulp.task('default', gulp.parallel('browserSync', 'watcher'));