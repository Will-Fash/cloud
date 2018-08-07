function getPropertyGrid(property) {
    return `<div class="col-md-4 col-sm-6">
                    <div class="property_item heading_space">
                        <div class="image">
                            <a href="/Property/Details?id=` + property.Id + `"><img src="` + property.PreviewUrl + `" style="height: 250px;" alt="Property" class="img-responsive"></a>
                            <div class="price clearfix">
                                <span class="tag pull-right">$` + property.Price + (property.Status.trim().toLowerCase() == 'for rent' ? ' Per Month' : '') + `</span>
                            </div>
                            <span class ="tag_t"> ` + property.Status + ` </span>
                        </div>
                        <div class="proerty_content">
                            <div class="proerty_text">
                                <h3 class ="captlize"><a href= "/Property/Details?id=` + property.Id + `" >` + property.Title + `</a></h3>
                                <p>` + property.Street + `, ` + property.City + `, ` + property.Province + `</p>
                            </div>
                            <div class="property_meta transparent">
                                <span><i class="icon-select-an-objecto-tool"></i>` + property.Size + ` sq ft</span>
                                <span><i class="icon-bed"></i>` + property.Bedrooms + ` Bedrooms</span>
                                <span><i class="icon-safety-shower"></i>` + property.Bedrooms + ` Bathrooms</span>
                            </div>
                            <div class="favroute clearfix">
                                <p class="pull-md-left">` + property.Posted_At + ` &nbsp; <i class="icon-calendar2"></i></p>
                            </div>
                            <div class="toggle_share collapse" id="one">
                                <ul>
                                    <li><a href="#." class="facebook"><i class="icon-facebook-1"></i> Facebook</a></li>
                                    <li><a href="#." class="twitter"><i class="icon-twitter-1"></i> Twitter</a></li>
                                    <li><a href="#." class="vimo"><i class="icon-vimeo3"></i> Vimeo</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
}

var searchData = JSON.parse(sessionStorage.getItem('castle_search_data'));

if (searchData !== null) {
    console.log(searchData);
    $('#rSliderPrice').attr('data-cur_min', searchData.MinPrice);
    $('#rSliderPrice').attr('data-cur_max', searchData.MaxPrice);

    $(document).ready(function () {
        $('#searchForm #keyword').val(searchData.Keyword);
        if (searchData.Province != "")
            $('#searchForm #province').zelectItem(searchData.Province);
        if (searchData.Status != "")
            $('#searchForm #status').zelectItem(searchData.Status);
        $('#searchForm #minBeds').val(searchData.MinBeds);
        $('#searchForm #maxBeds').val(searchData.MaxBeds);
        $('#searchForm #minBaths').val(searchData.MinBaths);
        $('#searchForm #maxBaths').val(searchData.MaxBaths);
        $('#searchForm #minPrice').val(searchData.MinPrice);
        $('#searchForm #maxPrice').val(searchData.MaxPrice);
        $('#searchForm #minArea').val(searchData.MinArea);
        $('#searchForm #maxArea').val(searchData.MaxArea);
        //$('#searchForm #minBeds').val(searchData.MinBeds);
        //$('#searchForm #maxBeds').val(searchData.MaxBeds);

        $.ajax({
            url: API_HOST + '/api/Property/Search',
            method: 'POST',
            data: searchData,
            success: function (data) {
                if (data.length > 0) {
                    $(data).each(function (i, property) {
                        $('#propertyListings').append(getPropertyGrid(property));
                    });
                }
                else
                    $('#propertyListings').append('<h3 style="margin-bottom: 40px;">No property matching the search parameters</h3>');
            },
            error: function (xhr, status, error) {
                swal('Could not search', 'An error occurred. Please try again!', 'error');
            }
        });
        
    });
}