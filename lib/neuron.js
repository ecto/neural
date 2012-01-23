/*
 * neuron class
 * <cam@onswipe.com>
 */

var Neuron = function (options) {
  options = options || {};
  this.layer = options.layer;
  this.network = options.network;
  this.index = options.index;
  //this.activationThreshold = options.threshold || 1;
  this.bias = options.bias || this.random();
  this.p = options.p || 1;
  this.weights = [];
  this.change = [];
  this.activation = 0;
  this.output = 0;
  this.error = 0;
  this.delta = 0;
  this.network.log('neuron', 'neuron initialized at index ' + this.index.toString().green + ' in layer ' + this.layer.index.toString().green);
}

Neuron.prototype.generateRandomWeights = function () {
  var nextLayer = this.getNextLayer();
  if (nextLayer) {
    for (var i = 0; i < nextLayer.neurons.length; i++) {
      this.weights.push(this.random());
    }
    this.network.log('neuron', 'added weights for ' + this.weights.length.toString().green + ' nodes to neuron ' + this.index.toString().green + ' in layer ' + this.layer.index.toString().green);
  } else {
    this.network.log('neuron', 'skipping weights for neuron ' + this.index.toString().red + ' in layer ' + this.layer.index.toString().green);
  }
}

Neuron.prototype.random = function () {
  return Math.random() - 0.2;
}

Neuron.prototype.getNextLayer = function () {
  return this.network.layers[this.layer.index + 1];
}

Neuron.prototype.getPreviousLayer = function () {
  return this.network.layers[this.layer.index - 1];
}

Neuron.prototype.calculateOutput = function () {
  var previousLayer = this.getPreviousLayer();
  this.activation = this.bias;
  for (var i = 0; i < previousLayer.neurons.length; i++) {
    var n = previousLayer.neurons[i];
    this.activation += n.output * n.weights[this.index];
  }
  this.output = this.sigmoid(this.activation);
}

Neuron.prototype.sigmoid = function (x) {
  return 1 / (1 + Math.pow(Math.E, -x * this.p));
}

Neuron.prototype.dsigmoid = function (x) {
  return x * (1 - x);
}

Neuron.prototype.calculateError = function (outputs) {
  if (outputs) {
    var expected = outputs[this.index] || 0;
    this.network.log('neuron', 'detected target output: ' + expected.toString().red);
    this.error = expected - this.output;
  } else {
    this.error = 0;
    var nextLayer = this.getNextLayer();
    for(var i = 0; i < nextLayer.length; i++) {
      var n = nextLayer[i];
      this.error += n.delta * n.weights[this.index];
    }
  }
  this.delta = this.error * this.dsigmoid(this.output); 
  this.network.log('neuron', 'calculated error for neuron ' + this.index.toString().green + ' in layer ' + this.layer.index.toString().green);
  this.network.log('neuron', '  error: ' + this.error.toString().red);
  this.network.log('neuron', '  delta: ' + this.delta.toString().red);
}

Neuron.prototype.adjustWeights = function () {
  this.network.log('neuron', 'adjusting weights for neuron ' + this.index.toString().green + ' in layer ' + this.layer.index.toString().green);
  var previousLayer = this.getPreviousLayer();
  for (var i = 0; i < previousLayer.neurons.length; i++) {
    var n = previousLayer.neurons[i];
    var change = this.network.learningRate * this.delta * n.output + this.network.momentum * (this.change[i] || 0);
    this.change[i] = change;
    this.weights[i] += change;
   }
   this.bias += this.network.learningRate * this.delta; 
}

module.exports = Neuron;
