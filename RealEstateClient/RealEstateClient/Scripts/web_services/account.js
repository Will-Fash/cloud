$("#registerForm").submit(function (event) {
    event.preventDefault();
    var form = $(this);

    var userData = JSON.stringify({
        UserName: form.find('#username').val().trim(),
        Email: form.find('#email').val().trim(),
        PhoneNumber: form.find('#phone').val().trim(),
        Description: form.find('#description').val().trim(),
        Password: form.find('#password').val().trim(),
        ConfirmPassword: form.find('#confirmPassword').val().trim()
    });

    doRegisterUser(userData);
});

$('#loginForm').submit(function (event) {
    event.preventDefault();

    var form = $(this);

    var username = form.find('#loginUsername').val().trim();
    var password = form.find('#loginPassword').val().trim();
    
    $.ajax({
        url: API_HOST + '/Token',
        method: 'POST',
        contentType: 'application/json',
        data: "grant_type=password&username=" + username + "&password=" + password,
        success: function (result) {
            doLoginUser(result.access_token);
        },
        error: function (xhr, status, error) {
            var error = xhr.responseJSON.error_description;
            swal('Login Failed', error, 'error');
        },
    });
});

function doRegisterUser(userData) {
    $.ajax({
        url: API_HOST + '/api/Account/Register',
        method: 'POST',
        contentType: 'application/json',
        data: userData,
        success: function (result) {
            swal('Registration Successful!', 'Thank you for joining us. Please login to continue', 'success').then(function () {
                form.trigger("reset");
                $('#loginTabLink').trigger("click");
            });
        },
        error: function (xhr, status, error) {
            if (xhr.responseJSON !== undefined) {
                var errors = xhr.responseJSON.ModelState;
                swal('Registration Failed', errors[Object.keys(errors)[0]][0], 'error');
            }
            else
                swal('Registration Failed', 'An error occured', 'error');
        },
    });
}

function doLoginUser(token) {
    localStorage.setItem('castle_user_access_token', token);
    swal('Login Successful!', 'Thank you for joining us. Please login to continue', 'success').then(function () {
        var previous = localStorage.getItem('castle_previous_page');
        if (previous !== null) {
            localStorage.removeItem('castle_previous_page');
            window.location.href = previous;
        }
        else
            window.location.href = "/";
    });
}