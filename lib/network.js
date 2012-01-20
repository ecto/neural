var Layer = require('./layer');

var Network = function (options) {
  options = options || {};
  this.momentum = options.momentum || 0.1;
  this.learningRate = options.learningRate || 0.25;
  this.bias = options.bias || true;
  this.numberOfInputs = options.numberOfInputs || 0;
  this.numberOfOutputs = options.numberOfOutputs || 0;
  this.numberOfHiddenLayers = options.numberOfHiddenLayers || 0;
  this.neuronsPerHiddenLayer = options.neuronsPerHiddenLayer || 0;
  this.transport = options.transport || 'memory';
  // load transport
  this.layers = [];
}

Network.prototype.build = function () {
  // add input nodes
  // for each hidden layer, add layer nodes
  // add output nodes
  // callback?
}

Network.prototype.run = function (input) {

}

Network.prototype.train = function (input, output) {

}

Network.prototype.backpropogate = function (expectedOutput) {

}

Network.prototype.calculateError = function (expectedOutput) {

}

Network.prototype.feedforward = function (input) {

}

Network.prototype.save = function () {}
Network.prototype.load = function () {}

module.exports = Network;
