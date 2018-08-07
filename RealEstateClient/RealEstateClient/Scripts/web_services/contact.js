$('#contactForm').submit(function (event) {
    event.preventDefault();

    var form = $(this);

    var contactAddress = {
        Name: form.find('#name').val(),
        Phone: form.find('#phone').val(),
        Email: form.find('#email').val(),
        Message: form.find("#message").val(),
    };

    $.ajax({
        url: API_HOST + '/api/Mail/Contact',
        method: 'POST',
        data: contactAddress,
        success: function (data) {
            swal("Sent successfully!", "Thank you for contacting us. We will get back to you soon!", "success");
        },
        error: function (xhr, status, error) {
            if (xhr.responseJSON !== undefined) {
                var errors = xhr.responseJSON.ModelState;
                var errorMsg = errors[Object.keys(errors)[0]][0];
                swal('Could not send message', errorMsg, 'error');
            }
            else
                swal('Could not send message', 'An error occurred. Please try again!', 'error');
        }
    });
});