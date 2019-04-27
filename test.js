$(function () {
    $("#home").slideUp(0).delay(250).fadeIn(500);
});

function signUp() {
    if (isValideData()) {
        if (!isExists($("#login").val())) {
            $.ajax({
                type: "GET",
                url: "/api/registration",
                data: {
                    login: $("#login").val(),
                    password: $("#password").val()
                },
                contentType: "application/json",
                success: function (data, textStatus) {
                    window.location.replace("/");
                },
                error: function (request, status, error) {
                    var resp = jQuery.parseJSON(request.responseText);
                    alert(resp.message);
                }
            });
        } else {
            alert("аЂаАаКаОаЙ аПаОаЛбаЗаОаВаАбаЕаЛб баЖаЕ бббаЕббаВбаЕб.");
        }
    }
}

function signIn() {
    $.ajax({
        type: "POST",
        url: "/login",
        data: JSON.stringify({
            login: $("#login").val(),
            password: $("#password").val()
        }),
        contentType: "application/json",
        success: function (data, textStatus) {
            window.location.replace("/");
        },
        error: function (request, status, error) {
            var resp = jQuery.parseJSON(request.responseText);
            alert(resp.message);
        }
    });
}

//return true if user exists in database
function isExists(login) {
    var isExists;
    $.ajax({
        type: "GET",
        url: "/api/users/exists",
        async: false,
        data: {
            login: login
        },
        contentType: "application/json",
        success: function (data, textStatus) {
            isExists = data.exists;

        },
        error: function (request, status, error) {
            var resp = jQuery.parseJSON(request.responseText);
            alert(resp.message);
        }
    });
    return isExists;
}

function isValideData() {
    var login = $("#login").val();
    var password = $("#password").val();
    if (login.length < 5 || login.length > 10) {
        alert("ааОаГаИаН аДаОаЛаЖаЕаН аБббб аОб 5 аДаО 10 баИаМаВаОаЛаОаВ");
        return false;
    } else if (password.length < 5 || password.length > 20) {
        alert("ааАбаОаЛб аДаОаЛаЖаЕаН аБббб аОб 5 аДаО 20 баИаМаВаОаЛаОаВ");
        return false;
    } else if (!/^([a-zаА-бб]+|\\d+)$/.test(login) || !/^([a-zаА-бб]+|\\d+)$/.test(password)) {
        alert("ааОаГаИаН аИ аПаАбаОаЛб аМаОаГбб баОаДаЕбаЖаАбб баОаЛбаКаО аБбаКаВб");
        return false;
    }
    return true;
}
