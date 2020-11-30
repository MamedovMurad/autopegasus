var arabam;
(function (arabam) {
    var TramerRecordController = /** @class */ (function () {
        function TramerRecordController(HttpHelperService, DialogService) {
            this.HttpHelperService = HttpHelperService;
            this.DialogService = DialogService;
            this.selectedRecordType = null;
            this.showExpertise = false;
            this.selectedQuestionIndex = null;
            this.isButtonActive = false;
            this.inputValue = null;
            this.isLoggedIn = false;
            this.willForcedToRefresh = false;
            this.isMobile = window.configuration.IsMobile;
            this.queryString = null;
            this.recordTypes = [
                {
                    index: "plaka",
                    label: "Plaka ile sorgula",
                    placeholder: "Plaka girin",
                    key: 10
                },
                {
                    index: "sasi",
                    label: "Şasi no ile sorgula",
                    placeholder: "Şasi no girin",
                    key: 20
                }
            ];
            this.questions = [
                {
                    question: "Herhangi bir aracı sorgulayabilir miyim?",
                    answer: "Evet, plaka ya da şasi numarasını bildiğiniz herhangi bir " +
                        "aracın hasar kaydını sorgulayabilirsiniz."
                },
                {
                    question: "Hangi bilgileri görebilirim?",
                    answer: "Eğer aracın daha önce bir hasar kaydı varsa ilgili kaydın " +
                        "tarihini, nedenini ve tutarını buradan görebilirsiniz."
                },
                {
                    question: "Aracın tüm hasarlarını görebilir miyim?",
                    answer: "Maalesef, sadece 2003 yılından sonra kasko ve trafik " +
                        "sigortasına yansıyan hasar bilgilerini gösterebiliyoruz."
                },
                {
                    question: "Peki siz bunları nereden biliyorsunuz?",
                    answer: "Tüm bu bilgileri Sigorta Bilgi ve Gözetim Merkezi’nin " +
                        "sağladığı Sigortam360 hizmeti sayesinde sizlere ulaştırıyoruz. " +
                        "Dilerseniz www.sbm.org.tr adresinden daha fazla bilgiye " +
                        "ulaşabilirsiniz."
                }
            ];
            this.selectedRecordType = this.recordTypes[0];
            if (window.location.search !== "") {
                var value = this.getQueryVar("value");
                var type_1 = this.getQueryVar("type");
                var found = this.recordTypes.filter(function (record) { return record.index === type_1; });
                if (type_1 && found.length > 0) {
                    this.selectedRecordType = found[0];
                }
                this.inputValue = value ? this.clearUnwanteds(value) : null;
                this.focusInput();
            }
        }
        TramerRecordController.prototype.triggerLogin = function (state) {
            this.isLoggedIn = state;
            this.willForcedToRefresh = !state;
        };
        TramerRecordController.prototype.getQueryVar = function (varName) {
            var queryStr = unescape(window.location.search) + "&";
            var regex = new RegExp(".*?[&\\?]" + varName + "=(.*?)&.*");
            return queryStr.replace(regex, "$1") === queryStr
                ? false
                : queryStr.replace(regex, "$1");
        };
        TramerRecordController.prototype.toggleFaqIndex = function (index) {
            this.selectedQuestionIndex =
                this.selectedQuestionIndex === index ? null : index;
        };
        TramerRecordController.prototype.plateValidation = function (value) {
            return /^(0[1-9]|[1-7][0-9]|8[01])([A-PR-VYZ](\d{4,5})|[A-PR-VYZ]{2}(\d{3,4})|[A-PR-VYZ]{3}(\d{2,3}))$/.test(value);
        };
        TramerRecordController.prototype.chasisValidation = function (value) {
            return value && value.length === 17;
        };
        TramerRecordController.prototype.checkAndValidate = function () {
            if (typeof this.inputValue !== "undefined" && this.inputValue) {
                this.inputValue = this.clearUnwanteds().toUpperCase();
                if ((this.selectedRecordType.index === "sasi" &&
                    this.chasisValidation(this.inputValue)) ||
                    (this.selectedRecordType.index === "plaka" &&
                        this.plateValidation(this.inputValue))) {
                    this.isButtonActive = true;
                    return true;
                }
            }
            this.isButtonActive = false;
            return false;
        };
        TramerRecordController.prototype.clearUnwanteds = function (value) {
            value = value ? value : this.inputValue;
            if (typeof value !== "undefined" && value) {
                return value.replace(/[^A-Za-z0-9]/g, "").replace(/\s/g, "");
            }
            return null;
        };
        TramerRecordController.prototype.inputKeyup = function (event) {
            if (event.which === 13) {
                event.preventDefault();
                this.checkAndValidate();
                this.submitQuery();
            }
            if (event.which === 32 || event.charCode === 32) {
                event.preventDefault();
            }
        };
        TramerRecordController.prototype.submitQuery = function () {
            if (!this.isLoggedIn) {
                this.callLoginDialog(true);
            }
            else if (this.isButtonActive) {
                this.postQuery();
            }
        };
        TramerRecordController.prototype.callLoginDialog = function (reQuery) {
            var _this = this;
            if (reQuery === void 0) { reQuery = false; }
            this.DialogService.closeAll();
            this.DialogService.callLogin({
                callBack: function () {
                    _this.DialogService.closeAll();
                    _this.focusInput();
                    if (reQuery) {
                        _this.postQuery();
                    }
                }
            });
        };
        TramerRecordController.prototype.focusInput = function () {
            if (angular.element("input#plakaOrSasiValue").length) {
                angular.element("input#plakaOrSasiValue")[0].focus();
            }
            if (!this.inputValue) {
                this.isButtonActive = false;
            }
        };
        TramerRecordController.prototype.postQuery = function () {
            var _this = this;
            this.HttpHelperService.httpPostWithPromise("/damageQuery/create-order", {
                Value: this.inputValue,
                Type: this.selectedRecordType.key
            }).then(function (result) {
                if (result.Success) {
                    window.location.href = result.Data;
                }
                else {
                    if (result.Code === 500) {
                        _this.internalErrorAfterQuery();
                    }
                    else if (result.Code === 401) {
                        _this.callLoginDialog(true);
                    }
                }
            }).catch(function (error) { return _this.applicationErrorWhileQueryRunning(); });
        };
        TramerRecordController.prototype.internalErrorAfterQuery = function (result) {
            var _this = this;
            this.DialogService.plateOrChasisNotFound(this.selectedRecordType.index, this.inputValue).catch(function (response) {
                if (_this.willForcedToRefresh) {
                    _this.refreshWithState();
                    return false;
                }
                _this.inputValue = null;
                _this.focusInput();
            });
        };
        TramerRecordController.prototype.applicationErrorWhileQueryRunning = function () {
            // Succes'e takılmayalım
            this.DialogService.success({
                title: "İşlem yapılamadı",
                message: "Sorgunuz yapılırken bir sıkıntı ile karşılaşıldı. " +
                    "Sorununuz teknik ekiplere iletildi ve " +
                    "en kısa süre içinde çözülecektir.<br><br>" +
                    "Anlayışınız için teşekkür ederiz.",
                confirm: "Tamam"
            });
        };
        TramerRecordController.prototype.refreshWithState = function () {
            window.location.href = "" + window.location.origin + window.location.pathname + "?type=" + this.selectedRecordType.index;
        };
        TramerRecordController.$inject = ["HttpHelperService", "DialogService"];
        return TramerRecordController;
    }());
    arabam.TramerRecordController = TramerRecordController;
    angular
        .module("arabam")
        .controller("TramerRecordController", TramerRecordController);
})(arabam || (arabam = {}));
