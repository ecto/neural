var Layer = require('./layer');

var Network = function (options) {
  options = options || {};
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

Network.prototype.train = function () {}
Network.prototype.save = function () {}
Network.prototype.load = function () {}

module.exports = Network;
