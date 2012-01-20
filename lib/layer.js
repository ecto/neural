var Neuron = require('./neuron');

var Layer = function (options) {
  options = options || {};
  this.numberOfNeurons = options.numberOfNeurons || 0;
  this.neurons = [];
}

module.exports = Layer;
