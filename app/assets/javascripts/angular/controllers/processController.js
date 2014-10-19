CFBadges.controller("processController", ["$scope", '$window', function($scope, $window) {
  "use strict";

  $scope.csvFields = [];
  $scope.csvFieldsVisible = {};
  $scope.canvasPrimitives = {};

  var initialize = function() {
    var canvasElement = "process";
    $scope.canvas = new Canvas(canvasElement);
    // TODO Dispatch type
    var url = gon.file.file_url;
    $scope.loadVector(url);
    // $scope.loadVector(url);
  };

  $scope.loadImage = function(url) {
    var background = new Texture();
    background._updateImage(url).then(function() {
      $scope.canvas.updateDimensions(background);
    });
    $scope.canvas.add(background).renderAll();
    background.sendToBack();
  };

  $scope.loadVector = function(url) {
    fabric.loadSVGFromURL(url,function(objects, options) {
      options.selectable = false;
      var obj = fabric.util.groupSVGElements(objects, options);
      $scope.canvas.add(obj).renderAll();
      obj.sendToBack();
      $scope.canvas.updateDimensions(obj);
    });
  };

  $scope.parseAndCreateCheckbox = function(file) {
    var result;
    // TODO remove get from dom
    var csvEl = $('#csv');
    var csvFile = csvEl.val().replace(/.+[\\\/]/, "");
    $scope.canvas.clearFromAttrs();

    Papa.parse(csvFile, {
      download: true,
      preview: 1,
      complete: function(results) {
        result = results.data[0];
        _.each(result, function(attr){
          $scope.csvFields.push(attr);
          $scope.csvFieldsVisible[attr] = false;

        }, this);
        $scope.$apply();
      }
    });
  };

  $scope.showCanvasSVG = function() {
    $window.open('data:image/svg+xml;utf8,' + encodeURIComponent($scope.canvas.toSVG()));
  };

  $scope.toggleCanvasVisible = function(field) {
    if ($scope.shouldCreatePrimitive(field)) {
      $scope.addField(field);
    }

    if ($scope.shouldDeletePromitive(field)) {
      $scope.removeField(field);
    }
  };

  $scope.shouldCreatePrimitive = function(field) {
    return ($scope.csvFieldsVisible[field] && _.isUndefined($scope.canvasPrimitives[field]));
  };

  $scope.shouldDeletePromitive = function(field) {
    return (!$scope.csvFieldsVisible[field] && _.isObject($scope.canvasPrimitives[field]));
  };

  $scope.addField = function(field) {
    var fieldPrimitive = $scope.canvas.addField(field);
    $scope.canvasPrimitives[field] = fieldPrimitive;
  };

  $scope.removeField = function(field) {
    $scope.canvas.removeField(field);
    // TODO reset primitive from hash
    $scope.canvasPrimitives[field] = undefined;
  };

  initialize();

}]);
