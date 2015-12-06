'use strict';

angular.module('potatoApp').factory('FlickrResource', function ($http, $q, $log, $resource) {

    var Picture = function (id, title, link, media, published, description, authorLink, tags) {
        this.id = id;
        this.title = title,
            this.link = link ,
            this.media = media,
            this.published = published,
            this.description = description,
            this.authorLink = authorLink,
            this.tags = tags
    };

    var feedList = [];

    var getFeedList = function () {
        if (feedList.length > 0) {
            var deferred = $q.defer();
            deferred.resolve(feedList);
            return deferred.promise;
        } else {
            return loadPictures();
        }
    }

    var getPicture = function (pictureId) {
        return feedList[parseInt(pictureId)];
    }

    var loadPictures = function (tag) {
        var url;
        if (tag !== undefined && !tag.trim()) {
            url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';
        } else {
            url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + tag + '&tagmode=any&format=json&jsoncallback=JSON_CALLBACK';
        }
        var deferred = $q.defer();

        $http.jsonp(url).
            success(function (data) {
                // $log.debug(data);
                feedList = [];
                var i = 0;
                angular.forEach(data.items, function (item) {
                    var authorLink = 'http://www.flickr.com/photos/' + item.author_id;
                    var tags = item.tags.split(' ');
                    this.push(new Picture(i++, item.title, item.link, item.media.m, item.published, item.description, authorLink, tags));
                }, feedList);
                deferred.resolve(feedList);
            }).
            error(function (data, status) {
                $log.error('error loading pictures: ' + status);
                deferred.reject(status);
            });
        return deferred.promise;
    };

    return {
        loadPictures: loadPictures,
        getFeedList: getFeedList,
        getPicture: getPicture
    };

});