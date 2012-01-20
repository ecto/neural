
var neural = require('../');

var net = new neural.Network({
  debug: true
});

var iterations = 100;
for (var i = 0; i < iterations; i++) {
  net.train([1, 2, 3], [0, 1]);
  net.train([4, 5, 6], [1, 0]);
}

net.run([7, 8, 9]);
