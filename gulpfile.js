// 'use strict';

// // Определим необходимые инструменты
// const gulp = require('gulp');
// const less = require('gulp-less');
// const rename = require('gulp-rename');
// const sourcemaps = require('gulp-sourcemaps');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const mqpacker = require('css-mqpacker');
// const browserSync = require('browser-sync').create();

// // ЗАДАЧА: Компиляция препроцессора
// gulp.task('less', function(){
//   return gulp.src('./less/style.less')                      // какой файл компилировать (путь из константы)
//     .pipe(sourcemaps.init())                                // инициируем карту кода
//     .pipe(less())                                           // компилируем LESS
//     .pipe(rename('style.css'))                              // переименовываем
//     .pipe(postcss([                                         // делаем постпроцессинг
//         autoprefixer({ browsers: ['last 2 version'] }),     // автопрефиксирование
//         mqpacker({ sort: true }),                           // объединение медиавыражений
//     ]))
//     .pipe(sourcemaps.write('/'))                            // записываем карту кода как отдельный файл (путь из константы)
//     .pipe(gulp.dest('./css/'))                              // записываем CSS-файл (путь из константы)
//     .pipe(browserSync.stream());                            // обновляем в браузере
// });

// // // ЗАДАЧА: Сборка HTML (заглушка)
// // gulp.task('html', function(callback) {
// //   callback();
// // });

// // ЗАДАЧА: Сборка HTML
// gulp.task('html', function() {
//   return gulp.src(dirs.source + '/*.html')                  // какие файлы обрабатывать (путь из константы, маска имени)
//     .pipe(fileinclude({                                     // обрабатываем gulp-file-include
//       prefix: '@@',
//       basepath: '@file',
//       indent: true,
//     }))
//     .pipe(replace(/\n\s*<!--[\s\S]+?-->/gm, ''))            // убираем комментарии <!--DEV ... -->
//     .pipe(gulp.dest(dirs.build));                           // записываем файлы (путь из константы)
// });

// // ЗАДАЧА: Сборка всего
// gulp.task('build', gulp.series(
//   'less'
// ));

// // ЗАДАЧА: Локальный сервер, слежение
// gulp.task('serve', gulp.series('build', function() {

//   browserSync.init({                                        // запускаем локальный сервер (показ, автообновление, синхронизацию)
//     server: './',                                           // папка, которая будет «корнем» сервера (путь из константы)
//     port: 3000,                                             // порт, на котором будет работать сервер
//     // startPath: 'index.html',                                // файл, который буде открываться в браузере при старте сервера
//     // open:false - прописать для запрета открытия браузера

//     // startPath: 'roomslist.html',
//     // startPath: 'singleroom.html',
//     startPath: 'form.html',
//   });

//   gulp.watch(                                               // следим за HTML
//     './*.html',
//     gulp.series('html', reloader)                           // при изменении файлов запускаем пересборку HTML и обновление в браузере
//   );

//   gulp.watch(                                               // следим за LESS
//     './less/**/*.less',
//     gulp.series('less')                                     // при изменении запускаем компиляцию (обновление браузера — в задаче компиляции)
//   );

// }));

// // ЗАДАЧА: Задача по умолчанию
// gulp.task('default',
//   gulp.series('serve')
// );

// // Дополнительная функция для перезагрузки в браузере
// function reloader(done) {
//   browserSync.reload();
//   done();
// }



'use strict';

// Определим необходимые инструменты
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// ЗАДАЧА: Компиляция препроцессора
gulp.task('less', function(){
  return gulp.src('src/less/style.less')                    // какой файл компилировать (путь из константы)
    .pipe(sourcemaps.init())                                // инициируем карту кода
    .pipe(less())                                           // компилируем LESS
    .pipe(rename('style.css'))                              // переименовываем
    .pipe(postcss([                                         // делаем постпроцессинг
        autoprefixer({ browsers: ['last 2 version'] }),     // автопрефиксирование
        mqpacker({ sort: true }),                           // объединение медиавыражений
    ]))
    .pipe(sourcemaps.write('/'))                            // записываем карту кода как отдельный файл (путь из константы)
    .pipe(gulp.dest('build/css/'))                              // записываем CSS-файл (путь из константы)
    .pipe(browserSync.stream());                            // обновляем в браузере
});

// ЗАДАЧА: Сборка HTML (заглушка)
gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('build/'))
  .pipe(browserSync.stream());
});

// IMG
gulp.task('img', function() {
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});

// ЗАДАЧА: Конкатенация и углификация Javascript
gulp.task('js', function () {
  return gulp.src([           // список обрабатываемых файлов
  'src/js/*.js'
])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// ЗАДАЧА: Сборка всего
gulp.task('build', gulp.series(
  'less', 'html', 'img', 'js'
));

// Публикация на github-pages
  gulp.task('deploy', function() {
    return gulp.src('build/**/*')
    .pipe(ghPages());
});

// ЗАДАЧА: Локальный сервер, слежение
gulp.task('serve', gulp.series('build', function() {

  browserSync.init({                                        // запускаем локальный сервер (показ, автообновление, синхронизацию)
    server: './build',                                           // папка, которая будет «корнем» сервера (путь из константы)
    baseDir: './build',
    port: 3000,                                             // порт, на котором будет работать сервер
    // startPath: 'build/form.html',                       // файл, который буде открываться в браузере при старте сервера
  });

  gulp.watch(                                               // следим за HTML
    'src/*.html',
    gulp.series('html', reloader)                           // при изменении файлов запускаем пересборку HTML и обновление в браузере
  );

  gulp.watch(                                               // следим за LESS
    'src/less/**/*.less',
    gulp.series('less', reloader)                           // при изменении запускаем компиляцию (обновление браузера — в задаче компиляции)
  );

  gulp.watch(                                               // следим за ImG
    'src/img/**/*.*',
    gulp.series('img', reloader)                            // при изменении запускаем компиляцию (обновление браузера — в задаче компиляции)
  );

  gulp.watch(                                               // следим за JS
    'src/js/**.js',
    gulp.series('js', reloader)                             // при изменении файлов запускаем пересборку JS и обновление в браузере
);

}));

// ЗАДАЧА: Задача по умолчанию
gulp.task('default',
  gulp.series('serve')
);

// Дополнительная функция для перезагрузки в браузере
function reloader(done) {
  browserSync.reload();
  done();
}
