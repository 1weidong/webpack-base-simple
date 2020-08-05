const hello = require('./hello.js')
require('./css/index.css')
document.querySelector('#root').appendChild(hello())
