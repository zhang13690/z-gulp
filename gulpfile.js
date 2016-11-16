'use strict';
// 载入需要的模块
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

// less任务
gulp.task('less', function() {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));// 为了能使浏览同步
});
//js任务
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('zgulp.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// 图片复制
gulp.task('img', function() {
    gulp.src('src/imgs/*.*')
        .pipe(gulp.dest('dist/imgs'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// html
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// browserSync
gulp.task('bs', function() {
    browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
    // 监视改动
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/imgs/*.*', ['img']);
    gulp.watch('src/*.html', ['html']);
});
// 默认的任务
gulp.task('default', function(){
	gulp.start('less');
    gulp.start('js');
    gulp.start('img');
    gulp.start('html');
    gulp.start('bs');
});
