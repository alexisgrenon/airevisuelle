const gulp = require('gulp');
const imagemin = require("gulp-imagemin");
const imageresize = require('gulp-image-resize');
var del = require('del');
var exec = require('child_process').exec;

// image resizing variables
const imagexl = 2620;
const imagefull = 1920;
const imagehalf = 1024;
const imagequart = 600;
const imagethumb = 80;

// clean images from dir
gulp.task("clean-image", function(){
  return del([
    'themes/airevisuelle/static/quart/**/*',
    'themes/airevisuelle/static/half/**/*',
    'themes/airevisuelle/static/thumb/**/*',
    'themes/airevisuelle/static/xl/**/*',
    'themes/airevisuelle/static/img/*',
    // we don't want to clean this file though so we negate the pattern
    '!themes/airevisuelle/static/img/icons'
  ]);
});
// resize and optimize images
gulp.task("image-resize", () => {
  return gulp.src("themes/airevisuelle/source-images/*.{jpg,png,jpeg,gif}")
    .pipe(imagemin())
    .pipe(imageresize({ width: imagexl}))
    .pipe(gulp.dest("themes/airevisuelle/static/xl/img"))
    .pipe(imageresize({ width: imagefull }))
    .pipe(gulp.dest("themes/airevisuelle/static/img"))
    .pipe(imageresize({ width: imagehalf }))
    .pipe(gulp.dest("themes/airevisuelle/static/half/img"))
    .pipe(imageresize({ width: imagequart }))
    .pipe(gulp.dest("themes/airevisuelle/static/quart/img"))
    .pipe(imageresize({ width: imagethumb }))
    .pipe(gulp.dest("themes/airevisuelle/static/thumb/img"));
});

// hugo production call
gulp.task("hugo", function (cb) {
  exec('hugo --cleanDestinationDir', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// watching images and resizing
gulp.task("watch", function() {
  gulp.watch('themes/airevisuelle/source-images/*.{jpg,png,jpeg,gif}', gulp.series('clean-image', 'image-resize'));
});

// watching images and resizing
gulp.task("dev", gulp.series("clean-image", "image-resize", "watch"));


// optimizing images and calling hugo for production
gulp.task("prod", gulp.series('clean-image', 'image-resize', 'hugo'));
