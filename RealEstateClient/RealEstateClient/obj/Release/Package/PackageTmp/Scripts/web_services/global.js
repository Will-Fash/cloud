if (sessionStorage.getItem('castle_error_msg') !== null) {
    swal('Error', sessionStorage.getItem('castle_error_msg'), 'error').then(function () {
        sessionStorage.removeItem('castle_error_msg');
    });
}

$('#accountLink').click(function () {
    if (window.location.pathname.toLowerCase() !== "/account")
        localStorage.setItem("castle_previous_page", window.location.pathname);
});


$('#searchForm').submit(function (event) {
    event.preventDefault();

    var form = $(this);
    var searchData = {
        Keyword: form.find('#keyword').val(),
        Province: form.find('#province').val(),
        Status: form.find('#status').val(),
        MinBeds: form.find('#minBeds').val(),
        MaxBeds: form.find('#maxBeds').val(),
        MinBaths: form.find('#minBaths').val(),
        MaxBaths: form.find('#maxBaths').val(),
        MinPrice: form.find('#minPrice').val(),
        MaxPrice: form.find('#maxPrice').val(),
        MinArea: form.find('#minArea').val(),
        MaxArea: form.find('#maxArea').val(),
        MinPrice: form.find('#priceRange').find('.leftLabel').html(),
        MaxPrice: form.find('#priceRange').find('.rightLabel').html()
    };
    sessionStorage.setItem('castle_search_data', JSON.stringify(searchData));
    window.location.href = "/Property/Search";
});