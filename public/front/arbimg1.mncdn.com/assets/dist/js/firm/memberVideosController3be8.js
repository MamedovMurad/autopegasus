var arabam;
(function (arabam) {
    var memberVideosController = /** @class */ (function () {
        function memberVideosController($timeout, $http, $sce, $rootScope) {
            this.$timeout = $timeout;
            this.$http = $http;
            this.$sce = $sce;
            this.$rootScope = $rootScope;
            this.videos = [];
            this.onlyVideos = [];
            this.page = 1;
            this.take = this.$rootScope.isMobile ? 2 : 12;
            this.showMoreButtonVisible = true;
            this.currentIndex = 0;
            this.videoToPlayInLightbox = {};
            this.showLightBox = false;
            //this.init();
        }
        memberVideosController.prototype.init = function () {
            var self = this;
            self.filterVideos(self.videos);
        };
        memberVideosController.prototype.trust = function (src) {
            var self = this;
            return self.$sce.trustAsResourceUrl(src);
        };
        memberVideosController.prototype.showMore = function () {
            var self = this;
            self.page += 1;
            self.$http.get('/testimonial/testimonial?page=' + self.page + '&take=' + self.take).then(function (result) {
                if (result.data.Data && result.data.Data.length > 0) {
                    self.videos = self.videos.concat(result.data.Data);
                    self.filterVideos(result.data.Data);
                }
                if (result.data.Data && result.data.Data.length != self.take) {
                    self.showMoreButtonVisible = false;
                }
            });
        };
        memberVideosController.prototype.filterVideos = function (rawVideoArray) {
            var self = this;
            rawVideoArray.forEach(function (video) {
                if (video.FirmTestimonialTypeKeyValue.Key != 0) {
                    self.onlyVideos.push(video);
                }
            });
        };
        memberVideosController.prototype.nextVideo = function () {
            var self = this;
            self.currentIndex = (self.currentIndex + 1) % self.onlyVideos.length;
        };
        memberVideosController.prototype.previousVideo = function () {
            var self = this;
            self.currentIndex = (self.currentIndex + self.onlyVideos.length - 1) % self.onlyVideos.length;
        };
        memberVideosController.prototype.getVideoCover = function (video) {
            var regex = /embed\/(.+)\?list/g;
            var id = regex.exec(video.EmbedUrl);
            var url = '';
            if (id && id.length > 1) {
                url = "url('https://img.youtube.com/vi/" + id[1] + "/0.jpg')";
            }
            else {
                url = "http://placehold.it/200x200";
            }
            return {
                "background-image": url
            };
        };
        memberVideosController.prototype.playVideo = function (video) {
            var self = this;
            var temp = angular.copy(video);
            temp.EmbedUrl += "&autoplay=1&showinfo=0";
            self.videoToPlayInLightbox = temp;
            self.showLightBox = true;
        };
        memberVideosController.prototype.closeVideo = function () {
            var self = this;
            self.showLightBox = false;
            $('#videoEmbedWrapper').attr('src', '');
            self.videoToPlayInLightbox = {};
        };
        memberVideosController.$inject = ["$timeout", "$http", "$sce", "$rootScope"];
        return memberVideosController;
    }());
    angular
        .module('arabam')
        .controller('memberVideoscontroller', memberVideosController);
})(arabam || (arabam = {}));
