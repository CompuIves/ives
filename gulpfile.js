var gulp = require("gulp");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var minifyCSS = require("gulp-minify-css");
var minifyHTML = require("gulp-minify-html");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var bower = require("gulp-bower");
var reload = browserSync.reload;

// Static Server + watching scss/html files
gulp.task(
  "serve",
  ["sass", "fonts", "bower", "html", "javascript", "resources"],
  function() {
    browserSync({
      server: "./app"
    });

    gulp.watch("bower_components/**/*.*", ["bower"]);
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("src/js/**/*.js", ["javascript"]);
    gulp.watch("src/res/**/*.*", ["resources"]);
  }
);

gulp.task(
  "build",
  ["sass", "fonts", "bower", "html", "javascript", "resources"],
  function() {}
);

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src(["src/scss/style.scss", "src/scss/materialize/materialize.scss"])
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      minifyCSS({
        keepBreaks: true
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["> 1%"]
      })
    )
    .pipe(gulp.dest("./app/css/"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("fonts", function() {
  return gulp
    .src(["src/scss/**/*.ttf", "src/scss/**/*.woff", "src/scss/**/*.woff2"])
    .pipe(gulp.dest("./app/"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("html", function() {
  return gulp
    .src("src/**/*.html")
    .pipe(plumber())
    .pipe(
      minifyHTML({
        conditionals: true
      })
    )
    .pipe(gulp.dest("./app/"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("javascript", function() {
  return gulp
    .src(["src/js/core.js", "src/js/services/*.js", "src/js/**/*.js"])
    .pipe(concat("all.min.js"))
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./app/"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("resources", function() {
  return gulp
    .src(["src/**/*.*", "!src/js/**/*.*", "!src/scss/**/*.*", "src/index.html"])
    .pipe(gulp.dest("./app"))
    .pipe(
      reload({
        stream: true
      })
    );
});

gulp.task("bower", function() {
  return bower("bower_components").pipe(gulp.dest("app/lib/"));
});

gulp.task("default", ["serve"]);
