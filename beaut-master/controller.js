angular.module('indexMod', [])
  .controller('indexController', ['$scope', '$http', function($scope, $http){

    //ボタン押下でデータ取得
    /*
    $scope.test = function(){
      //$http.get('http://127.0.0.1:3000/dummy.json'
      $http.get('./dummy.json'
      ).success(function(data){
        $scope.result = data;
      })
      .error(function(data,status,headers,config){
        console.log(error);
      });
    };
    */
    $http.get('./dummy.json'
    ).success(function(data){
      $scope.result = data;
    })
    .error(function(data,status,headers,config){
      console.log(error);
    });
}]);
