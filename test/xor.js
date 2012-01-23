var util = require('util');
var neural = require('../');

var net = new neural.Network({
});

var data = [
 [[0, 0], [0]],
 [[0, 1], [1]],
 [[1, 0], [1]],
 [[1, 1], [0]],
];

console.log(net.train(data));

console.log(
  net.run([1, 0])
);

console.log(
  util.inspect(net, false, null, true)
);
