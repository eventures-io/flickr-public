'use strict';

angular.module('potatoApp')
    .controller('DetailController', function ($scope, $state, FlickrResource) {

        $scope.picture =  FlickrResource.getPicture($state.params.pictureId);

        $scope.filterByTag =  function(searchTag){
            $state.go('main', {tag: searchTag} )
        }
    });


