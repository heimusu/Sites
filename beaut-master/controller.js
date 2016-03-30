module = angular.module('indexMod', []);

module.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
  		requireBase: false
	});
}]);


module.controller('indexController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){
    $http({
        method:'GET',
        //本番API
        //url:'http://api.beaut.asia/v1/stores',
        //モックサーバー
        url:'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
    })
    .success(function(data, status, headers, config){
        $scope.storeData = data;
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
            //本番API
            //url:'http://api.beaut.asia/v1/stores',
            //モックサーバー
            url:'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
        })
        .success(function(data, status, headers, config){
            $scope.storeData = data;
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

	$scope.renewDataButton = function(){
		//店舗idに向けてpostを投げれば良いはず…
		//店舗id
		//console.log($scope.result.id);
		/*
		//店舗情報
		console.log($scope.result.name);
		console.log($scope.result.zipcode);
		console.log($scope.result.address1);
		console.log($scope.result.address2);
		console.log($scope.result.address3);
		console.log($scope.result.tel);
		console.log($scope.result.hours);
		console.log($scope.result.hoursNote);
		console.log($scope.result.route);
		console.log($scope.result.direction);
		console.log($scope.result.siteUrl);
		console.log($scope.result.seatCount);
		console.log($scope.result.staffCount);
		console.log($scope.result.parkingCount);
		console.log($scope.result.jobOffer);
		*/
		/*
		//メニュー情報
		for(var i = 0; i < $scope.result.menuData.length; i++){
			console.log($scope.result.menuData[i].name);
			console.log($scope.result.menuData[i].description);
			console.log($scope.result.menuData[i].price);
			console.log($scope.result.menuData[i].contentUri);
		}
		*/

		/*
		//スタッフ情報
		for(var j = 0; j < $scope.result.staffData.length; j++){
			console.log($scope.result.staffData[j].id);
			console.log($scope.result.staffData[j].name);
			console.log($scope.result.staffData[j].description);
			console.log($scope.result.staffData[j].contentUri);
			console.log($scope.result.staffData[j].following);
			console.log($scope.result.staffData[j].followersCount);
			console.log($scope.result.staffData[j].postsCount);
			console.log($scope.result.staffData[j].likesCount);
		}
		*/

		//その他情報
		console.log($scope.result.categoryId);
		console.log($scope.result.areaId);
		console.log($scope.result.prefectureId);
		console.log($scope.result.holidays);
		console.log($scope.result.creditcard);
		console.log($scope.result.creditcardBrands);
		console.log($scope.result.blogUrl);
		console.log($scope.result.goodNote);
		console.log($scope.result.note);
		//ギャラリーデータ等，画像周りはPOSTできるようにすること
		console.log($scope.result.galleryData);
		console.log($scope.result.directionData);
		console.log($scope.result.following);
		console.log($scope.result.followersCount);
		console.log($scope.result.postsCount);
		console.log($scope.result.likesCount);

		//送信して更新
		//$window.location.reload();
	};


}]);
