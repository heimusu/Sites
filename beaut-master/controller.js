module = angular.module('indexMod', ['ngFileUpload']);

module.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);


module.controller('indexController', ['$scope', '$http', '$window', '$location', 'Upload', function($scope, $http, $window, $location, Upload) {
    $http({
            method: 'GET',
            //本番API
            url:'http://api.beaut.asia/v1/stores',
            //モックサーバー
            //url: 'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
        })
        .success(function(data, status, headers, config) {
            $scope.storeData = data;
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        });

    $scope.changeShop = function(index) {
        $window.location.href = 'index.html?shop=' + index;
    };

    var paramName = "shop";
    var param = $location.search()[paramName];
    $scope.index = param;

    if ($scope.index != undefined) {
        $http({
                method: 'GET',
                //本番API
                url:'http://api.beaut.asia/v1/stores',
                //モックサーバー
                //url: 'http://private-cb543-beautapiv1.apiary-mock.com/v1/stores?limit=10&offset=20&categoryId=1&q=サロン'
            })
            .success(function(data, status, headers, config) {
                $scope.storeData = data;
                $scope.result = $scope.storeData[$scope.index];

            })
            .error(function(data, status, headers, config) {
                console.log('error');
            });
    }

    //タブ切り替え
    $scope.tabShop = true;
    $scope.tabMenu = false;
    $scope.tabStaff = false;
    $scope.changeTab = function($event) {
        //material desigin lightのタブを使う関係上，idだとイベントが正しく取れない
        //var target = $event.target.id;
        //console.log($event.target.parentElement.id);
        var target = $event.target.parentElement.id;
        $scope.tabShop = false;
        $scope.tabMenu = false;
        $scope.tabStaff = false;
        if (target == "shop") {
            $scope.tabShop = true;
            componentHandler.upgradeDom();
        } else if (target == "menu") {
            $scope.tabMenu = true;
            componentHandler.upgradeDom();
        } else if (target == "staff") {
            $scope.tabStaff = true;
            componentHandler.upgradeDom();
        }
    };

    //DOM描画後更新
    $scope.update = function() {
        componentHandler.upgradeDom();
    };

    //画像削除ボタン
    $scope.deleteImage = function(index, deleteArea) {
        //ギャラリー一覧から削除
        if (deleteArea == 0) {
            //削除ギミック
            $scope.result.galleryData.splice(index, 1);
        }
        //メニュー一覧から削除
        else if (deleteArea == 1) {
            $scope.result.menuData.splice(index, 1);
        }
    };

    $scope.showInformation = 0;
    $scope.showMenuNumber = 0;
    $scope.showStaffNumber = 0;
    $scope.showMenu = function(index) {
        $scope.showMenuNumber = index;
    };
    $scope.showStaff = function(index) {
        $scope.showStaffNumber = index;
    };

    $scope.renewDataButton = function() {
        //店舗idに向けてpostを投げれば良いはず…
        //店舗id
        //console.log($scope.result.id);

        //メニューデータ
		if($scope.newMenuData != undefined){
        	var newMenuData = {
        		name: $scope.newMenuName,
        		description: $scope.newMenuDescription,
        		price: $scope.newMenuPrice,
        		contentUri: $scope.newImageUri
        	};
        	$scope.result.menuData.push(newMenuData);
		}

        //スタッフデータ
		if($scope.newStaffName != undefined){
        	var newStaffData = {
            	name: $scope.newStaffName,
            	description: $scope.newStaffDescription,
            	contentUri: $scope.newImageUri,
            	following: false,
            	followersCount: 0,
            	postsCount: 0,
            	likesCount: 0
        	};
        	$scope.result.staffData.push(newStaffData);
		}

        //サンプル
		/*
        //お気に入り登録ボタン
        $scope.addBookmarkButton = function() {
            console.log('add Bookmark');
            //console.log($scope.index);

            $scope.bookmark.push($scope.index);
            $http({
                    method: 'PUT',
                    url: 'http://localhost:3000/api/users/' + $scope.user_id,
                    data: {
                        name: $scope.username,
                        password: password,
                        bookmark: $scope.bookmark
                    }
                })
                .success(function(data, status, headers, config) {
                    console.log('success put!');
                    $window.location.reload();
                })
                .error(function(data, status, headers, config) {
                    console.log('error put');
                });
        };
		*/

		//PUT処理
		$http({
			//本番ではPUTに置き換える
			method: 'PUT',
			//本番ではURLにidを付与すること
			url: 'http://api.beaut.asia/v1/stores' + $scope.result.id,
			//headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Beaut-Session-Id':'153cb953f43138e5c289334455331234'},
			data:{
				id: $scope.result.id,
				name: $scope.result.name,
				zipcode: $scope.result.zipcode,
				address1: $scope.result.address1,
				address2: $scope.result.address2,
				address3: $scope.result.address3,
				tel: $scope.result.tel,
				hours: $scope.result.hours,
				hoursNote: $scope.result.hoursNote,
				route: $scope.result.route,
				direction: $scope.result.direction,
				siteUrl: $scope.result.siteUrl,
				seatCount: $scope.result.seatCount,
				staffCount: $scope.result.staffCount,
				parkingCount: $scope.result.parkingCount,
				jobOffer: $scope.result.jobOffer,
				menuData: $scope.result.menuData,
				staffData: $scope.result.staffData,
				categoryId: $scope.result.categoryId,
				areaId: $scope.result.areaId,
				prefectureId: $scope.result.prefectureId,
				holidays: $scope.result.holidays,
				creditcard: $scope.result.creditcard,
				creditcardBrands: $scope.result.creditcardBrands,
				blogUrl: $scope.result.blogUrl,
				goodNote: $scope.result.goodNote,
				note: $scope.result.note,
				galleryData: $scope.result.galleryData,
				directionData: $scope.result.directionData,
				following: $scope.result.following,
				followersCount: $scope.result.followersCount,
				postsCount: $scope.result.postsCount,
				likesCount: $scope.result.likesCount,
				body: $scope.result.body,
				contentUri: $scope.result.contentUri,
				publishedAt: $scope.result.publishedAt,
				closedAt: $scope.result.closedAt,
				liked: $scope.result.liked
			}
		})
		.success(function(data,status, headers, config){
			console.log('success!');
			$window.location.reload();
		})
		.error(function(data, status, headers, config){
			console.log('error!' + status);
		});
    };


	//写真投稿フォーム
    $scope.submit = function(file) {
        if (file) {
            $scope.upload(file);
            console.log('success');
        }
    };

	//写真をサーバーに投げる
    $scope.upload = function(file) {
        Upload.upload({
            url: 'http://private-cb543-beautapiv1.apiary-mock.com/v1/images',
            data: {
                file: file
            }
        }).then(function(resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.newImageUri = resp.data.imageUrl;
            //console.log($scope.newImageUri);
        }, function(resp) {
            console.log('Error status: ' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


}]);
