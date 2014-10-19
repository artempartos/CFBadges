CFBadges.controller("processController", ["$scope", '$window', '$http', '$timeout', function($scope, $window, $http, $timeout) {
  "use strict";

  $scope.csvFile = undefined;
  $scope.csvFields = [];
  $scope.csvFieldsVisible = {};
  $scope.canvasPrimitives = {};
  $scope.showProgressBar = false;
  $scope.orderCount = 0;
  $scope.orderCountCurrent = 0;

  var initialize = function() {
    var canvasElement = "process";
    $scope.canvas = new Canvas(canvasElement);
    // TODO Dispatch type
    var url = gon.file.file_url;
    // $scope.loadImage(url);
    $scope.loadVector(url);
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
    $scope.csvFile = csvEl.val().replace(/.+[\\\/]/, "");

    $scope.file = file;

    $scope.canvas.clearFromAttrs();

    Papa.parse($scope.csvFile, {
      download: true,
      complete: function(results) {
        console.log("results",results);
        result = results.data[0];
        _.each(result, function(attr){
          $scope.csvFields.push(attr);
          $scope.csvFieldsVisible[attr] = false;
        }, this);
        $scope.csvData = results.data;
        $scope.$apply();
      }
    });
  };

  $scope.showCanvasSVG = function() {
    $window.open('data:image/svg+xml;utf8,' + encodeURIComponent($scope.canvas.toSVG()));
  };

  $scope.generateSVG = function() {
    var params = {
      csv_data: $scope.csvData,
      svg: $scope.canvas.toSVG()
    };

    $scope.initProgressBar();

    $http.post(Routes.api_generate_index_path(), params).
      success(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      }).
      error(function(data, status, headers, config) {
        console.log("Sorry, error :(");
      });
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

  $scope.initProgressBar = function() {
    $scope.orderCount = _.size($scope.csvData) - 1;
    $scope.orderCountCurrent = 0;
    $scope.showProgressBar = true;
    $scope.tick();
  };

  $scope.tick = function() {
    $timeout(function() {
      if ($scope.orderCountCurrent < $scope.orderCount) {
        $scope.tick();
        $scope.orderCountCurrent += 1;
        $scope.apply();
      } else {
        $scope.getLink();
      }
    }, 3000);
  };

  $scope.getLink = function() {
    // $http.get(Routes.api_generate_index_path(), params).
      // success(function(data, status, headers, config) {
        // console.log(data, status, headers, config);
      // }).
      // error(function(data, status, headers, config) {
        // console.log("Sorry, error :(");
      // });
  };

  initialize();



}]);
