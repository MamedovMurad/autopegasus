var headerAuction = /** @class */ (function () {
    // tslint:disable-next-line:member-ordering
    function headerAuction() {
        var _this = this;
        this.scrolling = false;
        this.domList = {
            domBuyNow: document.getElementById("js-hook-buy-now-container"),
            domAppBanner: document.getElementById("js-hook-for-install-app-banner")
        };
        this.init = function (data) {
            if (data) {
                _this.domList.domBuyNow.classList.remove("dn");
                document.getElementById("header").classList.add("push-header-for-auction");
            }
            _this.subscribeObserver(data);
        };
        this.subscribeObserver = function (data) {
            var checkIfScrolling = function (scrollYPosition) {
                var cachedScrollType = _this.scrolling;
                _this.scrolling = scrollYPosition > 0;
                if (_this.scrolling != cachedScrollType) {
                    _this.launchClassOperations(data);
                }
            };
            window.addEventListener("scroll", window.debounce(function () {
                var scrollTop = window.scrollY || document.body.scrollTop || window.pageYOffset || 0;
                checkIfScrolling(scrollTop);
            }, 53));
        };
        this.launchClassOperations = function (data) {
            var self = _this;
            var domList = _this.domList;
            if (!self.scrolling) {
                if (!!domList.domBuyNow) {
                    domList.domBuyNow.classList.remove("bn-sticky");
                    domList.domBuyNow.classList.remove("without-auction-bar");
                }
            }
            else {
                if (!!domList.domBuyNow) {
                    domList.domBuyNow.classList.add("bn-sticky");
                    domList.domBuyNow.classList.add("without-auction-bar");
                }
            }
        };
        window.addEventListener("load", function () {
            var xhttp = new XMLHttpRequest();
            var self = _this;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var data = this.response;
                    if (typeof data != "object") {
                        data = JSON.parse(this.response.toString());
                    }
                    if (data.Data) {
                        self.init(data.Data);
                    }
                }
            };
            xhttp.open("GET", "/api/get-auction-info?_=" + new Date().getTime());
            xhttp.setRequestHeader("Accept", "application/json");
            xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhttp.responseType = "json";
            xhttp.send();
        });
    }
    return headerAuction;
}());
headerAuction.call(this);
