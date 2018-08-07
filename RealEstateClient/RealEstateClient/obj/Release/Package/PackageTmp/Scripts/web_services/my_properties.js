function getMyProperty(property)
{
    return `<div class="row bg-hover">
            <div class="my-pro-list">
                <div class="col-md-2 col-sm-2 col-xs-12">
                    <img src= "` + property.PreviewUrl + `" alt="image" />
                </div>
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <div class="feature-p-text">
                        <h4><a href="/Property/Details?id=` + property.Id + `">` + property.Title + `</a></h4>
                        <p> ` + property.Street + `, ` + property.City + `, ` + property.Province + ` </p>
                        <span><b>Status:</b>  For Sale</span><br>
                        <div class="button-my-pro-list">
                            <a href="/Property/Details?id=` + property.Id + `">$` + property.Price +` </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-12">
                    <div class="select-pro-list">
                        <a href="javascript:void(0)" onclick="deleteProperty(` + property.Id + `)"><i class="icon-cross"></i></a>
                    </div>
                </div>
            </div>
        </div>`;
}

function deleteProperty(id) {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: API_HOST + "/api/Property/Delete?id=" + id,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('castle_user_access_token')
                },
                success: function (data) {
                    swal('Success', 'Property has been deleted succesfully!', 'success');
                    window.location.reload();
                },
                error: function (xhr, status, error) {
                    swal('Error', 'Could not delete property', 'error');
                }
            });
        }
    })
}

$.get(API_HOST + '/api/Property/ForUser?username=' + user, function (result) {
    $(result).each(function (i, prop) {
        $('#myProperties').append(getMyProperty(prop));
    });
});