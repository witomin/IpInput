(function ($) {
    $.fn.IpInput = function (options) {
        options = $.extend({
            ColorTrue: "black", //цвет текста когда проверка пройдена
            ColorFalse: "red" //цвет текста когда проверка не пройдена
        }, options);
        var init = $(this).data('IpInput');

        if (init) {
            return this;
        } else {
            $(this).data('IpInput', true);

            return this.on('input keyup', function () {
                var status;
                // разбиваем всю строку по запятой
                var ipaddreses = $(this).val().split(',');
                // проверяем корректность адресов
                $.each(ipaddreses, function (i, item) {
                    // диапазон
                    if (item.indexOf('-') != -1) {
                        if (!chek_valid_diapazon(item)) {
                            status = false;
                            return;
                        }
                    }
                    // диапазон по маске
                    else if (item.indexOf('/') != -1) {
                        if (!chek_valid_mask(item)) {
                            status = false;
                            return;
                        }
                    }
                    // одиночный адрес
                    else
                        //проверяем корректность
                        if (!chek_valid_ip(item)) {
                            status = false;
                            return;
                        }
                    status = true;
                });

                if (status)
                    $(this).css('color', options.ColorTrue);
                else
                    $(this).css('color', options.ColorFalse);
                $(this).data({ Status: status });
            });
        };
    };
})(jQuery);
// валидация ip
function chek_valid_ip(ip) {
    if (ip.match('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$') && ip.split('.').length == 4)
        return true;
    else
        return false;
}
// валидация диапазона ip
function chek_valid_diapazon(diapazon) {
    var addreses = diapazon.split('-');
    if (addreses.length != 2) {
        return false;
    }
    if (!chek_valid_ip(addreses[0]) || !chek_valid_ip(addreses[1])) {
        return false;
    }
    var begin = addreses[0].split('.');
    var end = addreses[1].split('.');
    X = begin[0] * Math.pow(256, 3) + begin[1] * Math.pow(256, 2) + begin[2] * Math.pow(256, 1) + begin[3] * Math.pow(256, 0);
    Y = end[0] * Math.pow(256, 3) + end[1] * Math.pow(256, 2) + end[2] * Math.pow(256, 1) + end[3] * Math.pow(256, 0);
    if (X < Y)
        return true;
    else
        return false;
}

function chek_valid_mask(mask) {

    var addreses = mask.split('/');
    if (addreses.length != 2) return false;
    if (!chek_valid_ip(addreses[0])) return false;
    if (!addreses[1].match('^[2-9]$|^[1-2][0-9]$|^3[0-2]$')) return false;
    return true;
}