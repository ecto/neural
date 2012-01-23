/*
 * neuron layer class
 * <cam@onswipe.com>
 */

var Neuron = require('./neuron');

var Layer = function (options) {
  options = options || {};
  this.volume = options.volume || 1;
  this.index = options.index;
  this.parent = options.parent;
  this.neurons = [];
  this.parent.log('layer', 'layer ' + this.index.toString().green + ' initialized');
}

Layer.prototype.grow = function (n) {
  this.parent.log('layer', 'growing layer ' + this.index.toString().green);
  for (var i = 0; i < this.volume; i++) {
    this.add();
  }
}

Layer.prototype.add = function () {
  this.parent.log('layer', 'adding neuron to layer ' + this.index.toString().green);
  var i = this.neurons.length;
  var n = new Neuron({
    index: this.neurons.length,
    layer: this,
    network: this.parent
  });
  this.neurons.push(n);
}

Layer.prototype.fillWeights = function () {
  this.neurons.forEach(function (neuron) {
    neuron.generateRandomWeights();
  });
}

Layer.prototype.setOutputs = function (values) {
  for (var i = 0; i < this.neurons.length; i++) {
    this.neurons[i].output = values[i];
  }
}

Layer.prototype.getOutputs = function () {
  var outputs = [];
  this.neurons.forEach(function (neuron) {
    outputs.push(
      neuron.output
    );
  });
  return outputs;
}

Layer.prototype.calculateOutputs = function () {
  this.neurons.forEach(function (neuron) {
    neuron.calculateOutput();
  });
}

Layer.prototype.calculateErrors = function (outputs) {
  this.neurons.forEach(function (neuron) {
    neuron.calculateError(outputs);
  });
}

Layer.prototype.getMeanError = function () {
  var sum = 0;
  this.neurons.forEach(function (neuron) {
    sum += neuron.error;
  });
  return Math.sqrt(sum / this.neurons.length);
}

Layer.prototype.adjustWeights = function () {
  this.neurons.forEach(function (neuron) {
    neuron.adjustWeights();
  });
}

module.exports = Layer;
