var Canvas = fabric.util.createClass(fabric.Canvas, {
  initialize: function(el) {
    var options = {
      backgroundColor : "#fff",
      primitives: {},
      offset: [10, 10]
    };

    this.callSuper("initialize", el, options);
  },

  updateDimensions: function(object) {
    this.setDimensions({
      width: object.width,
      height: object.height
    });
  },

  removeField: function(field) {
    var name =  this.makeName(field);
    console.log(name);
    console.log(this._objects);
    _.each(this._objects, function(obj) {
      if (obj  && obj.name === name) {
        this.remove(obj);
      }
    }, this);
  },

  clearFromAttrs: function() {
    var buf = [];
    _.each(this._objects, function(obj) {
      if (obj && obj.deletable) {  buf.push(obj);}
    }, this);

    _.each(buf, function(obj) {
      this.remove(obj);
    }, this);

    this.offset = [10, 10];
    this.renderAll();
  },

  makeName: function(field) {
    return "svg_" + field;
  },

  addField: function(field) {
    var step = 20;

    var name = this.makeName(field);
    var rect = new RectPrimitive(name);
    var text = new fabric.IText(field, {
      hasRotatingPoint: false,
      lockRotation: true,
      fill: 'black',
      fontSize: 18,
      left: 10
    });

    var group = new fabric.Group([ rect, text ], {
      left: this.offset[0],
      top: this.offset[0],
      deletable: true,
      name: name
    });

    this.offset[0] += step;
    this.offset[1] += step;

    // var text = new
    this.add(group);
    group.bringForward();
    this.renderAll();
    return group;
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
  initialize: function(name) {
    var options = {
      hasRotatingPoint: false,
      lockRotation: true,
      width: 250,
      height: 70,
      fill: 'white',
      stroke : 'red',
      strokeWidth : 5,
      strokeDashArray: [5, 5],
      opacity: 0.7,
      name: name
    };
    this.callSuper("initialize", options);
  },

  getSvgStyles: function() {
    var result = [];
    var string = this.callSuper("getSvgStyles");
    result.push(string, " name: ", this.name, ";");
    return result.join('');
  }

});

fabric.IText.prototype.toSVG = function () {
  return "";
};
