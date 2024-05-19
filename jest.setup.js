const { createCanvas } = require("canvas");
global.Image = window.Image;
global.HTMLCanvasElement.prototype.getContext = function () {
  return createCanvas(1, 1).getContext("2d");
};
global.URL.createObjectURL = function () {};
