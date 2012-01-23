/*
 * neural network class
 * <cam@onswipe.com>
 */

var colors = require('colors');
var Layer = require('./layer');

var Network = function (options) {
  options = options || {};
  this.debug = options.debug || false;
  this.momentum = options.momentum || 0.1;
  this.learningRate = options.learningRate || 0.5;
  this.numberOfHiddenLayers = options.numberOfHiddenLayers || 1;
  this.neuronsPerHiddenLayer = options.neuronsPerHiddenLayer || 2;
  this.layers = [];
  this.log('info', 'initialized');
}

/*
 * Construct input, hidden, output laters
 * Instruct them to build their neurons
 */
Network.prototype.build = function (inputs, outputs) {
  this.log('net', 'building network');
  // add input nodes
  this.log('net', 'adding input layer');
  this.grow(0, inputs);

  // for each hidden layer, add layer nodes
  this.log('net', 'adding hidden layers');
  for (var i = 0; i < this.numberOfHiddenLayers; i++) {
    this.grow(this.layers.length, this.neuronsPerHiddenLayer);
  }

  // add output nodes
  this.log('net', 'adding output layer');
  this.grow(this.layers.length, outputs);

  // fill weights
  this.layers.forEach(function (layer) {
    layer.fillWeights();
  });
}

/*
 * Add a new layer at index of size volume,
 * trigger layer population
 */
Network.prototype.grow = function (index, volume) {
  this.log('net', 'adding layer at index ' + index.toString().green + ' with volume ' + volume.toString().green);
  var layer = new Layer({
    index: index,
    volume: volume,
    parent: this
  });
  layer.grow();
  this.layers[index] = layer;
}

/*
 * Evalute a set of inputs and return the output activations
 */
Network.prototype.run = function (input) {
  this.log('net', 'running input ' + input.toString().green);
  this.layers[0].setOutputs(input);
  for (var i = 1; i < this.layers.length; i++) {
    this.layers[i].calculateOutputs();
  }
  return this.layers[this.layers.length - 1].getOutputs();
}

Network.prototype.updateWeights = function () {

}

/*
 * Train the net
 * If this is the first train, grow inputs and outputs
 * Run inputs, evaluate outputs, correct errors
 * Do this for # of iterations or until error threshold is reached
 */
Network.prototype.trainOne = function (input, output) {
  this.log('net', 'training ' + input.toString().green + ' ' + output.toString().red);
  if (!this.layers[0]) {
    this.build(input.length, output.length);
  }
  this.layers[this.layers.length - 1].calculateErrors(output);
  for (var i = this.layers.length - 2; i >= 0; i--) {
    this.layers[i].calculateErrors();
  }

  for (var i = 1; i < this.layers.length; i++) {
    this.layers[i].adjustWeights();
  }

  return this.layers[this.layers.length - 1].getMeanError();
}

Network.prototype.train = function (points, options) {
  options = options || {};
  var iterations = options.iterations || 200000;
  var errorThreshold = options.errorThreshold || 0.01;
  var error = 1;
  for (var i = 0; i < iterations; i++) {
    var errorSum = 0;
    for (var j = 0; j < points.length; j++) {
      var e = this.trainOne(points[j][0], points[j][1]);
      errorSum += Math.pow(e, 2);
    }
    error = Math.sqrt(errorSum, points.length);
  }
}

Network.prototype.import = function () {}
Network.prototype.export = function () {}

Network.prototype.log = function (level, message) {
  if (this.debug) {
    console.log('neural '.blue + level.grey + ' ' + message);
  }
}

module.exports = Network;
