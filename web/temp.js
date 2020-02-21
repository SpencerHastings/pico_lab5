angular.module('picoTemp', [])
  .controller('TemperatureController', function($scope, $http, $interval) {

    $scope.eci = "PwPiYzCHNFdAEDM5R4rmJ4";

    $scope.tempURL = 'http://localhost:8080/sky/cloud/PwPiYzCHNFdAEDM5R4rmJ4/temperature_store/temperatures';

    $scope.violURL = 'http://localhost:8080/sky/cloud/PwPiYzCHNFdAEDM5R4rmJ4/temperature_store/threshold_violations';
    
    $scope.currentTemperature = 0.0;

    $scope.temperatures = [];

    $scope.violations = [];

    $scope.updateTemperatures = function() {
        return $http.get($scope.tempURL).then(function(data){
            $scope.temperatures = data.data.slice(-10);
          }, null);
    }

    $scope.updateViolations = function() {
        return $http.get($scope.violURL).then(function(data){
            $scope.violations = data.data.slice(-10);
          }, null);
    }

    

    $scope.updateAll = function() {
        $scope.updateTemperatures();
        $scope.updateViolations();

        $scope.currentTemperature = $scope.temperatures[0];
    }

    $scope.updateAll();


    $interval($scope.updateAll, 1000);

  });