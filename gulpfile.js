const { series } = require('gulp');

function test(cb) {
  console.log('\nAdd your tests to gulpfile.js! :)\n');
  cb();
}

exports.default = series(test);
