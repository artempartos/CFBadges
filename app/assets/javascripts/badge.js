var canvas;

window.onload = function () {
  "use strict";
  var canvasElement = "process";
  canvas = new Canvas(canvasElement);

  // TODO Write dispatcher

  // var url = 'test.jpg';
  var url = 'badge.svg';

  // loadRastr(url, canvas);
  loadVector(url, canvas);
};

function loadRastr(url, canvas) {
  var background = new Texture();
  background._updateImage(url).then(function() {
    canvas.updateDimensions(background);
  });
  canvas.add(background).renderAll();
}

function loadVector(url, canvas) {
  var path = fabric.loadSVGFromURL(url,function(objects, options) {
    options.selectable = false;
    var obj = fabric.util.groupSVGElements(objects, options);
    canvas.add(obj).renderAll();
    canvas.updateDimensions(obj);
  });
}
