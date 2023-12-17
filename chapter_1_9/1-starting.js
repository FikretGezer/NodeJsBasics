//Global objects instead of window object
console.log(global);
//CommonJS modules instead of ES6 modules
const os = require('os');
const path = require('path');
const { add, subtract, multiply } = require('./math');

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);

console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));

console.log(add(1,3));
console.log(subtract(1,3));
console.log(multiply(1,3));
