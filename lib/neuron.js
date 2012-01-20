

var Neuron = function (options) {
  options = options || {};
  this.activation = false;
  this.weights = [];
  this.activationThreshold = options.threshold || 1;
}

Neuron.prototype.emit = function () {

}
