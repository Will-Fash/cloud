function getLatestProperty(property) {
    return `<div class="item">
        <div class="property_item heading_space">
            <div class="image"> <a href="/Property/Details?id=` + property.Id + `"><img src="` + property.PreviewUrl + `" alt="latest property" class="img-responsive"></a> </div>
            <div class="price default_clr clearfix bottom20">
                <span class="tag pull-left">` + property.Status + `</span>
                <h4 class ="pull-right">$` + property.Price + (property.Status.trim().toLowerCase() == 'for rent' ? ' Per Month' : '') + `</h4>
            </div>
            <div class="proerty_content">
                <div class="proerty_text">
                    <h3 class ="bottom15"> <a href= "/Property/Details?id=` + property.Id + `">` + property.Title + `</a></h3>
                    <p>` + property.Description.substr(0, 50) + `...</p>
                </div>
                <div class="favroute clearfix">
                    <p class ="pull-md-left"> ` + property.Street + `, ` + property.City + `, ` + property.Province + ` </p>
                    <ul class="pull-right">
                        <li><a href="javascript:void(0)"><i class="icon-video-player"></i></a></li>
                        <li><a href="javascript:void(0)"><i class="icon-like"></i></a></li>
                        <li><a href="#one" class="share_expender" data-toggle="collapse"><i class="icon-share3"></i></a></li>
                    </ul>
                </div>
                <div class="toggle_share collapse" id="one">
                    <ul>
                        <li><a href="javascript:void(0)" class="facebook"><i class="icon-facebook-1"></i> Facebook</a></li>
                        <li><a href="javascript:void(0)" class="twitter"><i class="icon-twitter-1"></i> Twitter</a></li>
                        <li><a href="javascript:void(0)" class="vimo"><i class="icon-vimeo3"></i> Vimeo</a></li>
                    </ul>
                </div>
                <div class ="property_meta"> <span><i class ="icon-select-an-objecto-tool"></i>` + property.Size + ` sq ft</span> <span><i class ="icon-bed"></i>` + property.Bedrooms + ` Bedrooms</span> <span><i class ="icon-safety-shower"></i>` + property.Bathrooms + ` Bathrooms</span> </div>
            </div>
        </div>
    </div>`;
}

function getSliderProperty(property) {
    return `<li data-transition="fade">
                <img src="` + property.PreviewUrl + `" alt="" data-bgposition="center center" data-bgfit="cover">
                <div class="black-caption tp-caption tp-resizeme"
                     data-x="['left','left','center','center']" data-hoffset="['0','0','0','15']"
                     data-y="['center','center','center','center']" data-voffset="['0','0','0','0']"
                     data-responsive_offset="on"
                     data-transform_idle="o:1;"
                     data-transform_in="x:-50px;opacity:0;s:2000;e:Power3.easeOut;"
                     data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;">
                    <div class="price">` + property.Status + `</div>
                    <h2>` + property.Title + `</h2>
                    <p class="bottom30">
                        ` + property.Description.substr(0, 50) + `...
                    </p>
                    <div class="property_meta">
                        <span><i class="icon-select-an-objecto-tool"></i>` + property.Size + ` sq ft</span>
                        <span><i class ="icon-bed"></i>` + property.Bedrooms + ` Bedrooms</span>
                        <span><i class ="icon-safety-shower"></i>` + property.Bathrooms + ` Bathrooms</span>
                    </div>
                    <div class="bottom row">
                        <div class="col-sm-6"><span> <i class="icon-icons74"></i>` + property.Street + `, ` + property.City + `, ` + property.Province + `</span></div>
                        <div class="col-sm-6"><span>$` + property.Price + (property.Status.trim().toLowerCase() == 'for rent' ? ' Per Month' : '') + `</span></div>
                    </div>
                </div>
            </li>`;
}

$.get(API_HOST + '/api/Property/Featured', function (result) {
    if (result.length > 0) {
        var slider = $('#homeSliderFeatured');
        $(result).each(function(i, property) {
            slider.append(getSliderProperty(property));
        });
        
        var propertyOfDay = result[0];


        var revapi;
        revapi = jQuery("#homeSlider").revolution({
            sliderType: "standard",
            sliderLayout: "fullwidth",
            scrollbarDrag: "true",
            navigation: {
                arrows: {
                    enable: true
                },
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                }
            },
            responsiveLevels: [1240, 1024, 778, 480],
            gridwidth: [1170, 992, 767, 480],
            gridheight: [560, 500, 450, 450],
            disableProgressBar: "on",
            spinner: "off",
        });
    }
    else {
        $('.featured-listings').hide();
    }
});

$.get(API_HOST + '/api/Property/Latest', function (result) {
    if (result.length > 0) {
        $(result).each(function (i, property) {
            $('#two-col-slider').append(getLatestProperty(property));
        });
        $("#two-col-slider").owlCarousel({
            autoPlay: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            stopOnHover: true,
            navigation: true,
            items: 2,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [979, 2],
            itemsMobile: [480, 1],
        });
    }
    else 
        $('#two-col-slider').append('<h3 style="margin-bottom: 40px;">No properties have been listed</h3>');
});