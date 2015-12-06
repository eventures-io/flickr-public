'use strict';

angular.module('potatoApp')
    .controller('MainController', function ($scope, FlickrResource, $state) {

        $scope.feedlist = [];
        $scope.loadError = false;
        $scope.tag = '';

        $scope.search = function () {
            FlickrResource.loadPictures($scope.tag)
                .then(function (feedlist) {
                    $scope.feedlist = feedlist;
                }, function () {
                    $scope.loadError = 'show';
                });
        };

        $scope.showDetail = function(id) {
            $state.go('detail', {pictureId: id})
        }

        if($state.params.tag) {
            $scope.tag = $state.params.tag;
            $scope.search($state.params.searchTag);
        } else {
            FlickrResource.getFeedList()
                .then(function (feedlist) {
                    $scope.feedlist = feedlist;
                }, function () {
                    $scope.loadError = 'show';
                });
        }


    });

