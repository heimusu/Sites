module = angular.module('createMod', ['ngFileUpload']);

module.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

//ヘッダー設定
module.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.post['X-Beaut-Session-Id'] = '153cb953f43138e5c289334455331234';
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
  $httpProvider.defaults.headers.put['X-Beaut-Session-Id'] = '153cb953f43138e5c289334455331234';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
}]);

module.controller('createController', ['$scope', '$http', '$window', '$location', 'Upload', '$httpParamSerializerJQLike', function($scope, $http, $window, $location, Upload, $httpParamSerializerJQLike) {

  //店舗詳細画面への遷移ボタン
  $scope.changeShop = function(index) {
    $window.location.href = 'shopDetail.html?shop=' + index;
  };

  var paramName = "shop";
  var param = $location.search()[paramName];
  $scope.index = param;

  //タブ切り替え
  $scope.tabShop = true;
  $scope.tabMenu = false;
  $scope.tabStaff = false;
  $scope.changeTab = function($event) {
    //material desigin lightのタブを使う関係上，idだとイベントが正しく取れない
    //var target = $event.target.id;
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
      $scope.galleryData.splice(index, 1);
    }
    //メニュー一覧から削除
    else if (deleteArea == 1) {
      $scope.menuData.splice(index, 1);
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
    //メニューデータ
    if ($scope.newMenuData != undefined) {
      var newMenuData = {
        name: $scope.newMenuName,
        description: $scope.newMenuDescription,
        price: $scope.newMenuPrice,
        contentUri: $scope.newImageUri
      };
      $scope.menuData.push(newMenuData);
    }

    //スタッフデータ
    if ($scope.newStaffName != undefined) {
      var newStaffData = {
        name: $scope.newStaffName,
        description: $scope.newStaffDescription,
        contentUri: $scope.newImageUri,
        following: false,
        followersCount: 0,
        postsCount: 0,
        likesCount: 0
      };
      $scope.staffData.push(newStaffData);
    }
    $http({
        method: 'POST',
        url: 'http://api.beaut.asia/v1/stores',
        //'http://api.beaut.asia/v1/stores/569f4c5913926a669d5e857a'
        data: {
          name: $scope.name,
          zipcode: $scope.zipcode,
          address1: $scope.address1,
          address2: $scope.address2,
          address3: $scope.address3,
          tel: $scope.tel,
          hours: $scope.hours,
          hoursNote: $scope.hoursNote,
          route: $scope.route,
          direction: $scope.direction,
          siteUrl: $scope.siteUrl,
          seatCount: $scope.seatCount,
          staffCount: $scope.staffCount,
          parkingCount: $scope.parkingCount,
          jobOffer: $scope.jobOffer,
          menuData: $scope.menuData,
          staffData: $scope.staffData,
          categoryId: $scope.categoryId,
          areaId: $scope.areaId,
          prefectureId: $scope.prefectureId,
          holidays: $scope.holidays,
          creditcard: $scope.creditcard,
          creditcardBrands: $scope.creditcardBrands,
          blogUrl: $scope.blogUrl,
          goodNote: $scope.goodNote,
          note: $scope.note,
          galleryData: $scope.galleryData,
          directionData: $scope.directionData,
          following: $scope.following,
          followersCount: $scope.followersCount,
          postsCount: $scope.postsCount,
          likesCount: $scope.likesCount,
          body: $scope.body,
          contentUri: $scope.contentUri,
          publishedAt: $scope.publishedAt,
          closedAt: $scope.closedAt,
          liked: $scope.liked
        }
      })
      .success(function(data, status, headers, config) {
        console.log('success!');
        $window.location.reload();
      })
      .error(function(data, status, headers, config) {
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
      //url: 'http://private-cb543-beautapiv1.apiary-mock.com/v1/images',
      url: 'http://api.beaut.asia/v1/images',
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

  //店舗追加ボタン
  $scope.newStore = function() {
    $http({
        method: 'POST',
        url: 'http://api.beaut.asia/v1/stores',
        transformRequest: $httpParamSerializerJQLike,
        data: {
          name: $scope.newStoreName,
          categoryId: $scope.newCategoryId.id,
          prefectureId: $scope.newPrefectureId.id
        }
      })
      .success(function(data, status, headers, config) {
        console.log('success!');
        console.log(data);
        //$window.location.reload();
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      });
  };

  $scope.prefectureSelector = [{
    'id': 1,
    'prefecture': '北海道'
  }, {
    'id': 2,
    'prefecture': '青森県'
  }, {
    'id': 3,
    'prefecture': '岩手県'
  }, {
    'id': 4,
    'prefecture': '宮城県'
  }, {
    'id': 5,
    'prefecture': '秋田県'
  }, {
    'id': 6,
    'prefecture': '山形県'
  }, {
    'id': 7,
    'prefecture': '福島県'
  }, {
    'id': 8,
    'prefecture': '茨城県'
  }, {
    'id': 9,
    'prefecture': '栃木県'
  }, {
    'id': 10,
    'prefecture': '群馬県'
  }, {
    'id': 11,
    'prefecture': '埼玉県'
  }, {
    'id': 12,
    'prefecture': '千葉県'
  }, {
    'id': 13,
    'prefecture': '東京都'
  }, {
    'id': 14,
    'prefecture': '神奈川県'
  }, {
    'id': 15,
    'prefecture': '新潟県'
  }, {
    'id': 16,
    'prefecture': '富山県'
  }, {
    'id': 17,
    'prefecture': '石川県'
  }, {
    'id': 18,
    'prefecture': '福井県'
  }, {
    'id': 19,
    'prefecture': '山梨県'
  }, {
    'id': 20,
    'prefecture': '長野県'
  }, {
    'id': 21,
    'prefecture': '岐阜県'
  }, {
    'id': 22,
    'prefecture': '静岡県'
  }, {
    'id': 23,
    'prefecture': '愛知県'
  }, {
    'id': 24,
    'prefecture': '三重県'
  }, {
    'id': 25,
    'prefecture': '滋賀県'
  }, {
    'id': 26,
    'prefecture': '京都府'
  }, {
    'id': 27,
    'prefecture': '大阪府'
  }, {
    'id': 28,
    'prefecture': '兵庫県'
  }, {
    'id': 29,
    'prefecture': '奈良県'
  }, {
    'id': 30,
    'prefecture': '和歌山県'
  }, {
    'id': 31,
    'prefecture': '鳥取県'
  }, {
    'id': 32,
    'prefecture': '島根県'
  }, {
    'id': 33,
    'prefecture': '岡山県'
  }, {
    'id': 34,
    'prefecture': '広島県'
  }, {
    'id': 35,
    'prefecture': '山口県'
  }, {
    'id': 36,
    'prefecture': '徳島県'
  }, {
    'id': 37,
    'prefecture': '香川県'
  }, {
    'id': 38,
    'prefecture': '愛媛県'
  }, {
    'id': 39,
    'prefecture': '高知県'
  }, {
    'id': 40,
    'prefecture': '福岡県'
  }, {
    'id': 41,
    'prefecture': '佐賀県'
  }, {
    'id': 42,
    'prefecture': '長崎県'
  }, {
    'id': 43,
    'prefecture': '熊本県'
  }, {
    'id': 44,
    'prefecture': '大分県'
  }, {
    'id': 45,
    'prefecture': '宮崎県'
  }, {
    'id': 46,
    'prefecture': '鹿児島県'
  }, {
    'id': 47,
    'prefecture': '沖縄県'
  }];
  $scope.newPrefectureId = $scope.prefectureSelector[0].id;

  $scope.categorySelector = [{
    'id': 1,
    'name': 'ヘアサロン'
  }, {
    'id': 2,
    'name': 'ネイル・アイ'
  }, {
    'id': 3,
    'name': 'エステ・リラク'
  }, {
    'id': 4,
    'name': 'ライフスタイル'
  }];

  $scope.newCategoryId = $scope.categorySelector[0].id;
}]);
