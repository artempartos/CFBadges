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

fabric.Group.prototype.lockRotation = true;
fabric.Group.prototype.hasRotatingPoint = false;
fabric.Group.prototype.hasControls = false;
