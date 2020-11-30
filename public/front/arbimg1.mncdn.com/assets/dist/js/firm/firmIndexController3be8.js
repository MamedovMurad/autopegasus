var arabam;
(function (arabam) {
    var FirmIndexController = /** @class */ (function () {
        function FirmIndexController(httpHelperService) {
            this.httpHelperService = httpHelperService;
            this.active = -1;
            this.dirtyCalc = true;
            this.firmFilteredWord = "";
            this.filteredFirms = false;
            this.inputOnFocus = false;
            this.inputDom = document.getElementById("firmFilteredWord");
            this.temp = { Data: { UsedCarSuggestion: [], NewCarSuggestion: [], NewsSuggestion: [], FirmSuggestion: [{ Type: 20, Id: '8645', Url: '/galeri/it-ekibi-a-s-istanbul', Text: 'GALERI 2000 ANKARA - Ankara', Description: '<b>GALERI</b> 2000 ANKARA - Ankara', Image: null, Brand: null, ModelName: null, Count: null, Query: null, PlainText: 'galeri', MemberId: '952331' }, { Type: 20, Id: '40523', Url: '/galeri/it-ekibi-a-s-istanbul', Text: 'SEYHAN OTO GALER? - Ankara', Description: 'SEYHAN OTO <b>GALERI</b> - Ankara', Image: null, Brand: null, ModelName: null, Count: null, Query: null, PlainText: 'galeri', MemberId: '4382487' }, { Type: 20, Id: '25459', Url: '/galeri/it-ekibi-a-s-istanbul', Text: 'GALERI AFFAN - Istanbul', Description: '<b>GALERI</b> AFFAN - Istanbul', Image: null, Brand: null, ModelName: null, Count: null, Query: null, PlainText: 'galeri', MemberId: '3615356' }], KeywordSuggestion: [] }, Success: true, Exception: null, Message: '', Header: null, Code: 200, Took: 0 };
        }
        FirmIndexController.prototype.searchFirm = function (city, filteredWord, $event) {
            if ($event) {
                $event.preventDefault();
            }
            if (!!this.firmSuggestions && this.firmSuggestions.length > 0) {
                var selectedLink = this.firmSuggestions.filter(function (activeSuggestion) { return !!activeSuggestion.Active; })[0];
                if (!!selectedLink && selectedLink.Url) {
                    window.location.href = selectedLink.Url;
                    return;
                }
            }
            if (!city && !filteredWord) {
                return;
            }
            var urlBuild = city
                ? "/galeriler?cityId=" + city + "&searchText=" + filteredWord
                : "/galeriler?searchText=" + filteredWord;
            window.location.href = urlBuild;
        };
        FirmIndexController.prototype.clearFirm = function () {
            this.filteredFirms = null;
            this.firmFilteredWord = "";
            this.focusAndArrangeCursor();
        };
        FirmIndexController.prototype.autoComplete = function () {
            var _this = this;
            this.httpHelperService.httpGet("/ilan/oneri?searchText=" + this.firmFilteredWord, function (res) {
                _this.suggestions = res.Data;
                // this.suggestions = this.temp.Data;
                _this.firmSuggestions = _this.suggestions.FirmSuggestion;
                _this.active = -1;
                _this.firmSuggestions.forEach(function (a) { return a.Active = false; });
                if (_this.firmSuggestions.length > 0) {
                    _this.createFauxGallery();
                }
            }, function (res) {
                console.warn('bir hata olustu ', res);
            }, { isNotLoading: true });
        };
        FirmIndexController.prototype.createFauxGallery = function () {
            this.suggestions.FirmSuggestion.push({
                Id: "faux",
                Description: '<span class="semi-bold pr4">Tüm galerilerde ara</span><i class="icon-arabam-gelen iag-odd-firm-result-icon"></i> ',
                Url: null,
                Text: 'Tüm galerilerde ara',
                Active: false
            });
        };
        FirmIndexController.prototype.checkKey = function (keyPressed) {
            if (!this.firmSuggestions || this.firmSuggestions.length == 0) {
                return;
            }
            var arrCount = +(this.firmSuggestions.length - 1);
            this.firmSuggestions.forEach(function (a) { return a.Active = false; });
            if (['up', 'down'].indexOf(keyPressed) != -1) {
                if (keyPressed == "up") {
                    switch (this.active) {
                        case -1:
                            this.inputDom.blur();
                            this.active = arrCount;
                            break;
                        case 0:
                            this.active = -1;
                            break;
                        default:
                            this.inputDom.blur();
                            this.active--;
                            break;
                    }
                }
                else if (keyPressed == "down") {
                    switch (this.active) {
                        case arrCount:
                            this.active = -1;
                            break;
                        case -1:
                            this.inputDom.blur();
                            this.active = 0;
                            break;
                        default:
                            this.active++;
                            this.inputDom.blur();
                            break;
                    }
                }
                if (this.active != -1) {
                    this.firmSuggestions[this.active].Active = true;
                }
                this.focusAndArrangeCursor();
            }
        };
        FirmIndexController.prototype.focusAndArrangeCursor = function () {
            var val = this.inputDom.value;
            var pos = this.inputDom.selectionStart;
            this.inputDom.value = '';
            this.inputDom.selectionStart = pos;
            this.inputDom.selectionEnd = pos;
            this.inputDom.value = val;
            this.inputDom.focus();
        };
        FirmIndexController.prototype.pressedEscape = function (event) {
            var currentElem = event.target;
            this.firmFilteredWord = "";
            this.suggestions = null;
            this.dirtyCalc = true;
            this.active = 0;
            currentElem.blur();
            event.preventDefault();
        };
        FirmIndexController.prototype.checkSuggestion = function (event) {
            switch (event.keyCode) {
                case 27:
                    this.pressedEscape(event);
                    break;
                case 38:
                    this.checkKey("up");
                    break;
                case 40:
                    this.checkKey("down");
                    break;
            }
        };
        FirmIndexController.prototype.inputFocusCb = function () {
            this.inputOnFocus = true;
        };
        FirmIndexController.prototype.clickOutsideCb = function () {
            this.inputOnFocus = false;
            this.active = -1;
        };
        FirmIndexController.$inject = ["HttpHelperService"];
        return FirmIndexController;
    }());
    angular
        .module("arabam")
        .controller("firmIndexController", FirmIndexController);
})(arabam || (arabam = {}));
