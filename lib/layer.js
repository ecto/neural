var Neuron = require('./neuron');

var Layer = function (options) {
  options = options || {};
  this.numberOfNeurons = options.numberOfNeurons || 0;
  this.neurons = [];
}

Layer.prototype.build = function () {

}

module.exports = Layer;
