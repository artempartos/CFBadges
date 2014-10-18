var Canvas = fabric.util.createClass(fabric.Canvas, {
  initialize: function(el) {
    var options = {
      backgroundColor : "#fff",
      primitives: {}
    };

    this.callSuper("initialize", el, options);
  },

  updateDimensions: function(object) {
    this.setDimensions({
      width: object.width,
      height: object.height
    });
  },

  addSelection: function(attr) {
    var rect = new RectPrimitive();
    this.add(rect);
    rect.bringForward();
    this.renderAll();
    console.log(this);
  }

});

var Texture = fabric.util.createClass(fabric.Image, {
  initialize: function() {
    var options = { selectable: false };
    this.callSuper("initialize", null, options);
  },

  addTo: function(canvas) {
    this.canvas = canvas;
    canvas.add(this);
  },

  _updateImage: function(url) {
    var deferred = $.Deferred();

    var img = new Image();
    img.onload = function() {
      this.setElement(img);
      deferred.resolve();
    }.bind(this);

    img.src = url;
    return deferred.promise();
  }


});

var RectPrimitive = fabric.util.createClass(fabric.Rect, {
  initialize: function() {
    var options = {
      hasRotatingPoint: false,
      lockRotation: true,
      // selectable: true,
      width: 200,
      height: 50,
      fill: 'red',
      opacity: 0.3
    };
    this.callSuper("initialize", options);
  }
});
