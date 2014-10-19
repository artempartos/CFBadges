CFBadges.controller("processController", ["$scope", '$window', function($scope, $window) {
  "use strict";

  $scope.csvElement = {};

  var initialize = function() {
    var canvasElement = "process";
    $scope.canvas = new Canvas(canvasElement);
    var url = gon.file.file_url;
    // $scope.loadRastr(url);
    $scope.loadVector(url);
  };

  $scope.loadRastr = function(url) {
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
    var csvEl = $('#csv');
    var csvFile = csvEl.val().replace(/.+[\\\/]/, "");
    $scope.canvas.clearFromAttrs();

    Papa.parse(csvFile, {
      download: true,
      preview: 1,
      complete: function(results) {
        result = results.data[0];
        _.each(result, function(attr){
          $scope.canvas.addSelection(attr);
        }, this);
      }
    });
  };

  $scope.showCanvasSVG = function() {
    $window.open('data:image/svg+xml;utf8,' + encodeURIComponent($scope.canvas.toSVG()));
  };


  initialize();

}]);
