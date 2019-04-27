$(loadingBorrowers);

function loadingBorrowers() {
    hideIfAuth();
    $.ajax({
        type: "GET",
        url: "/api/borrowers",
        contentType: "application/json",
        success: function (data, textStatus, xhr) {
            //todo mb fix(transfer) hidding elem
            if (Array.isArray(data)) {
                $(".wrapper").hide(); //hide loading spiner
                $('.container').append(" <table class=\"table table-hover\">\n" +
                    "        <thead>\n" +
                    "        <tr>\n" +
                    "            <th>ааМб</th>\n" +
                    "            <th>аЄаАаМаИаЛаИб</th>\n" +
                    "            <th>ааДбаЕбб</th>\n" +
                    "        </tr>\n" +
                    "        </thead>\n" +
                    "        <tbody>\n" +
                    "        </tbody>\n" +
                    "    </table>");

                data.forEach(function (value) {
                    $('.table tbody').append('<tr>' +
                        '<td>' + value.first_name + '</td>' +
                        '<td>' + value.last_name + '</td>' +
                        '<td>' + value.address + '</td>' +
                        '<td><a href="/credits?bid=' + value.id + '"  class="btn btn-outline-primary btn-sm">абаЕаДаИбаНаАб аИббаОбаИб</a></td>' +
                        '</tr>');
                });
            } else {
                $(".welcome-message").slideUp(0).delay(250).fadeIn(500);
                $.ajax({
                    type: "GET",
                    url: "/api/statistics/quantity",
                    contentType: "application/json",
                    success: function (data, textStatus, xhr) {
                        $('.borrower-count').text(data.borrower);
                        $('.credit-count').text(data.credit);
                    }
                });
            }
        }
    });
}


function searchBorrowers() {
    $.ajax({
        type: "GET",
        url: "/api/borrowers",
        data: {
            fname: $("#fname").val()
        },
        contentType: "application/json",
        success: function (data, textStatus, xhr) {
            $(".table").find("tr:not(:first)").remove();

            if (Array.isArray(data)) {
                data.forEach(function (value) {
                    $('.table tbody').append('<tr>' +
                        '<td>' + value.first_name + '</td>' +
                        '<td>' + value.last_name + '</td>' +
                        '<td>' + value.address + '</td>' +
                        '<td><a href="/credits?bid=' + value.id + '"  class="btn btn-outline-primary btn-sm">абаЕаДаИбаНаАб аИббаОбаИб</a></td>' +
                        '</tr>');
                });
            }
        }
    });
}

function hideIfAuth() {
    if (getCookie("token") !== undefined) {
        $("#logout").slideUp(0).delay(250).fadeIn(500);
        $("#graph").slideUp(0).delay(250).fadeIn(500);
        $("#admin-panel").slideUp(0).delay(250).fadeIn(500);
        /****************************************/
    } else {
        $("#registration").slideUp(0).delay(250).fadeIn(500);
        $("#sign-in").slideUp(0).delay(250).fadeIn(500);
        $("#admin-panel").slideUp(0).delay(250).fadeIn(500);
        $(".wrapper").hide(); //hide loading spiner
    }
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
