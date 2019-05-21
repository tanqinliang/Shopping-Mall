(function ($) {
    var RegNumber = /^[+-]?[0-9]+$/;
    var RegDecimal = /^(([1-9]\d{0,9})|0)(\.?[0-9]+)?$/;
    var RegEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var RegChina = /[\u4e00-\u9fa5]/;
    var RegPhone = /^\d{3,4}-\d{5,8}$/;
    var RegMobio = /^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$/;
    var RegQQ = /^[0-9]+$/;
    var RegTime = /^(([0-1][0-9])|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    var RegUrl = /^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^/][a-zA-Z0-9\.\,\?\'\\/\+&amp;%\$#\=~_\-@]*)*$/;

    jQuery.extend({
        IsNumeric: function (value) {
            return RegNumber.test(value);
        },
        IsDecimal: function (value) {
            return RegDecimal.test(value);
        },
        IsEmail: function (value) {
            return RegEmail.test(value);
        },
        IsIncludeChinese: function (value) {
            return RegChina.test(value);
        },
        IsPhone: function (value) {
            return RegPhone.test(value);
        },
        IsMobile: function (value) {
            return RegMobio.test(value);
        },
        IsQQ: function (value) {
            return RegQQ.test(value);
        },
        IsTime: function (value) {
            return RegTime.test(value);
        },
        IsUrl: function (value) {
            return RegUrl.test(value);
        }
    });

}(jQuery));