//const API_HOST = "http://realestateserver.azurewebsites.net";
//const API_HOST = "http://localhost:53399";
const API_HOST = "http://23.101.150.116";

var user = false;
if (localStorage.getItem('castle_user_access_token') !== null) {
    $.ajax({
        url: API_HOST + "/api/Account/UserInfo",
        async: false,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('castle_user_access_token')
        },
        success: function(data) {
            if (data.HasRegistered)
                user = data.Email;
        },
        error: function (xhr, status, error) {
            user = false;
        }
    });
}

if (user) {
    if (window.location.pathname.toLowerCase() == "/account")
        window.location.href = "/";
}
else {
    if (window.location.pathname.toLowerCase() == "/property/submit") {
        sessionStorage.setItem("castle_error_msg", "You have to be logged in to view this page");
        window.location.href = "/Account";
    }
}