var propertyPictures = [];
$("#upload-widget").dropzone({
    maxFiles: 10,
    url: API_HOST + '/api/Property/UploadPicture',
    success: function (file, response) {
        propertyPictures.push({
            Picture: response
        });
    }
});

$('#submitPropertyBtn').click(function () {
    if (propertyPictures.length > 0) {

        var title = $('#title').val().trim();
        var street = $('#street').val().trim();
        var city = $('#city').val().trim();
        var province = $('#province').val().trim();
        var status = $('#status').val().trim();
        var price = $('#price').val().trim();
        var size = $('#size').val().trim();
        var bedrooms = $('#bedrooms').val().trim();
        var bathrooms = $('#bathrooms').val().trim();
        var description = $('#description').val().trim();
        var feaures = [];
        $('.features-check').each(function (i, val) {
            if ($(val).is(":checked"))
                feaures.push($(val).val());
        });

        var propertyData = {
            Agent_Id: user,
            Title: title,
            Street: street,
            City: city,
            Province: province,
            Status: status,
            Size: size,
            Bedrooms: bedrooms,
            Bathrooms: bathrooms,
            Description: description,
            Features: feaures.toString(),
            Price: price,
            Preview: propertyPictures[0].Picture,
            Pictures: propertyPictures
        };


        $.ajax({
            url: API_HOST + "/api/Property/Submit",
            async: false,
            method: 'POST',
            data: propertyData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('castle_user_access_token')
            },
            success: function (data) {
                swal("Success", "Property has been added successfully!", "success");
                window.location.href = "/Property/Mine";
            },
            error: function (xhr, status, error) {
                var errors = xhr.responseJSON.ModelState;
                swal('Submission Failed!', errors[Object.keys(errors)[0]][0], 'error');
            }
        });
    }
    else
        swal('Error', 'No pictures uploaded', 'error');
});