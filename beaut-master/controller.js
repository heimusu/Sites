module = angular.module('indexMod', []);
/*
//クロスドメイン対策・認証用
module.config(['$httpProvider',function ($httpProvider) {
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
    //$httpProvider.defaults.headers.common['X-Beaut-Session-Id'] = 'b902846b9cb04e7785808ecd8582b7d1';
    //$httpProvider.defaults.headers.common['X-Beaut-Client-Type'] = 'ios-0.1.0';
}
]);
*/

module.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
  		requireBase: false
	});
}]);


module.controller('indexController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){

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
    //現在はモックサーバーから取得している
    /*
    $http({
        method:'GET',
        url:'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores/4ccd36cb027342adaa2db2ba1e3af079'
        //url:'http://private-cb543-beautapiv1.apiary-mock.com/v1/posts/4ccd36cb027342adaa2db2ba1e3af079'
        //url:'http://api.beaut.asia/v1/posts/4ccd36cb027342adaa2db2ba1e3af079',
        //headers:{'X-Beaut-Session-Id':'b902846b9cb04e7785808ecd8582b7d1','X-Beaut-Client-Type':'ios-0.1.0'}
    })
    .success(function(data, status, headers, config){
        //console.log(data);
        $scope.result = data;
        //駐車場有無判定用変数
        $scope.parking = $scope.result.parking;
    })
    .error(function(data,status,headers,config){
      console.log('error');
    });
    */
    $http({
        method:'GET',
        //本番API
        //url:'http://api.beaut.asia/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
        //モックサーバー
        url:'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
    })
    .success(function(data, status, headers, config){
        //console.log(data);
        $scope.storeData = data;
        console.log($scope.storeData);
    })
    .error(function(data,status,headers,config){
      console.log('error');
    });

    $scope.changeShop = function(index){
        $window.location.href = 'index.html?shop=' + index;
    };

    var paramName = "shop";
    var param = $location.search()[paramName];
    $scope.index = param;

    if($scope.index != undefined){
        $http({
            method:'GET',
            url:'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
        })
        .success(function(data, status, headers, config){
            //console.log(data);
            $scope.storeData = data;
            console.log($scope.storeData[$scope.index]);
            $scope.result = $scope.storeData[$scope.index];

        })
        .error(function(data,status,headers,config){
          console.log('error');
        });
    }

    //タブ切り替え
    $scope.tabShop = true;
    $scope.tabMenu = false;
    $scope.tabStaff = false;
    $scope.changeTab = function($event){
        //material desigin lightのタブを使う関係上，idだとイベントが正しく取れない
        //var target = $event.target.id;
        //console.log($event.target.parentElement.id);
        var target = $event.target.parentElement.id;
        $scope.tabShop = false;
        $scope.tabMenu = false;
        $scope.tabStaff = false;
        if(target == "shop"){
            $scope.tabShop = true;
            componentHandler.upgradeDom();
        }
        else if(target == "menu"){
            $scope.tabMenu = true;
            componentHandler.upgradeDom();
        }
        else if(target == "staff"){
            $scope.tabStaff = true;
            componentHandler.upgradeDom();
        }
    };

    //DOM描画後更新
    $scope.update=function(){
        componentHandler.upgradeDom();
    };

    //画像削除ボタン
    $scope.deleteImage = function(index,deleteArea){
        //ギャラリー一覧から削除
        if(deleteArea == 0){
            //削除ギミック
            $scope.result.galleryData.splice(index, 1);
        }
        //メニュー一覧から削除
        else if(deleteArea == 1){
            $scope.result.menuData.splice(index, 1);
        }
    };

    $scope.showInformation = 0;
    $scope.showMenuNumber = 0;
    $scope.showStaffNumber = 0;
    $scope.showMenu = function(index){
        $scope.showMenuNumber = index;
    };
    $scope.showStaff = function(index){
        $scope.showStaffNumber = index;
    };


}]);
