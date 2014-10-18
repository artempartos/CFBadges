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


  var result;
  Papa.parse("csv_example.csv", {
    download: true,
    preview: 1,
    complete: function(results) {
      result = results.data[0];
      _.each(result, function(attr){
        canvas.addSelection(attr);
      }, this);
    }
  });
};

function loadRastr(url, canvas) {
  var background = new Texture();
  background._updateImage(url).then(function() {
    canvas.updateDimensions(background);
  });
  canvas.add(background).renderAll();
  background.sendToBack();
}

function loadVector(url, canvas) {
  var path = fabric.loadSVGFromURL(url,function(objects, options) {
    options.selectable = false;
    var obj = fabric.util.groupSVGElements(objects, options);
    canvas.add(obj).renderAll();
    obj.sendToBack();
    canvas.updateDimensions(obj);
  });
}
