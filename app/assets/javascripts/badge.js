var canvas;

window.onload = function () {
  "use strict";
  var canvasElement = "process";
  canvas = new Canvas(canvasElement);

  // TODO Write dispatcher
  // var url = 'test.jpg';
  // var url = 'badge.svg';
  var url = gon.file.file_url;
  // loadRastr(url, canvas);
  loadVector(url, canvas);
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
};

function parseAndCreateSelection() {
  var result;
  var csvEl = $('#csv');
  var csvFile = csvEl.val().replace(/.+[\\\/]/, "");
  canvas.clearFromAttrs();

  Papa.parse(csvFile, {
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

function showCanvasSVG() {
  window.open('data:image/svg+xml;utf8,' + encodeURIComponent(canvas.toSVG()));
};
