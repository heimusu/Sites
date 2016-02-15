angular.module('indexMod', [])
  .controller('indexController', ['$scope', '$http', function($scope, $http){

    this.test = function(){
      $http.get('http://127.0.0.1:3000/dummy.json'
      ).success(function(data){
        this.result = data;
      })
      .error(function(data,status,headers,config){
      });
    };
}]);
