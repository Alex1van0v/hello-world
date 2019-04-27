$(loadingCreditHistory);

function loadingBorrowerCredits(isAdmin) {
    $("#home").slideUp(0).delay(250).fadeIn(500);
    $.ajax({
        type: "GET",
        url: "/api/credits",
        data: {
            bid: urlParameters()["bid"]
        },
        contentType: "application/json",
        success: function (data, textStatus) {
            $(".wrapper").hide(); //hide loading spiner
            var borrower = data[0].borrower;
            $(".card-block")
                .append('<h4 class="card-title">ааМб: ' + borrower.first_name + ' ' + borrower.last_name + '</h4>')
                .append('<p class="card-text">ааДбаЕб: ' + borrower.address + '</p>');
            if (isAdmin) {
                loadFlag(borrower.id);
            }
            data.forEach(function (value) {
                $('.table tbody').append('<tr>' +
                    '<td>' + value.sum + '</td>' +
                    '<td>' + value.closed + '</td>' +
                    '<td>' + value.overdue + '</td>' +
                    '</tr>');
            });
        }
    });
}

function loadingCreditHistory() {
    $.ajax({
        type: "GET",
        url: "/api/roles",
        contentType: "application/json",
        success: function (data, textStatus) {
            var isAdmin = false;
            if (data[0].authority === "ROLE_ADMIN") {
                isAdmin = true;
            }
            loadingBorrowerCredits(isAdmin);
        }
    });
}

function loadFlag(borrowerId) {
    $.ajax({
        type: "GET",
        url: "/api/flag",
        data: {
            bid: borrowerId
        },
        contentType: "application/json",
        success: function (data, textStatus) {
            $(".card-block")
                .append('<p class="card-text">аЄаЛаАаГ: ' + data + '</p>');
        }
    });
}

function urlParameters() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var map = {};
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        var value = decodeURIComponent(sParameterName[1]);
        if (map[sParameterName[0]]) {
            if (Array.isArray(map[sParameterName[0]])) {
                map[sParameterName[0]].push(value);
            } else {
                map[sParameterName[0]] = [map[sParameterName[0]], value];
            }
        } else {
            map[sParameterName[0]] = value;
        }
    }
    return map;
}
