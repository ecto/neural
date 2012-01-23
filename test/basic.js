var util = require('util');
var neural = require('../');

var net = new neural.Network({
  debug: true
});

console.log(net.trainOne([1, 2, 3], [0, 1]));

console.log(
  net.run([7, 8, 9])
);

console.log(
  util.inspect(net, false, null, true)
);
