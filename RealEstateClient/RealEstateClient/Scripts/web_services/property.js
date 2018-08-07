var propertyId = 0;
$.get(API_HOST + '/api/Property?id=' + (new URL(window.location)).searchParams.get("id"), function (result) {
    var property = result.Property;
    propertyId = property.Id;

    $(result.Pictures).each(function (i, picture) {
        $('.propertyPictures').append('<div class="item"><img src="' + picture.ImageUrl + '" alt="image" /></div>');
    });
    //Property Details
    var sync1 = $("#property-d-1");
    var sync2 = $("#property-d-1-2");
    sync1.owlCarousel({
        autoPlay: 3000,
        singleItem: true,
        slideSpeed: 1000,
        transitionStyle: "fade",
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });
    sync2.owlCarousel({
        autoPlay: true,
        items: 5,
        itemsDesktop: [1199, 10],
        itemsDesktopSmall: [979, 10],
        itemsTablet: [768, 8],
        itemsMobile: [479, 4],
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#property-d-1-2").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
        if ($("#property-d-1-2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }
    $("#property-d-1-2").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }
        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }
    }
    
    $('.propertyTitle').html(property.Title);
    $('.propertyLocation').html(property.Street + ", " + property.City + ", " + property.Province);
    $('.propertyDescription').html(property.Description);
    $('.propertyId').html(property.Id);
    $('.propertyPrice').html('$' + property.Price);
    $('.propertyStatus').html(property.Status);
    $('.propertySize').html(property.Size);
    $('.propertyBathrooms').html(property.Bathrooms);
    $('.propertyBedrooms').html(property.Bedrooms);
    $(property.Features.split(',')).each(function (i, feature) {
        $('.propertyFeatures').append('<div class="col-md-4 col-sm-6 col-xs-12"><ul class="pro-list"><li>' + feature + '</li></ul></div>');
    });

    $('.agentName').html(result.Agent.Username);
    $('.agentDescription').html(result.Agent.Description);
    $('.agentPhone').html(result.Agent.Phone);
    $('.agentMail').html(result.Agent.Email);
});

$('#contactForm').submit(function (event) {
    event.preventDefault();

    var form = $(this);

    var contactAddress = {
        Property: propertyId,
        Name: form.find('#name').val(),
        Phone: form.find('#phone').val(),
        Email: form.find('#email').val(),
        Message: form.find("#message").val(),
    };

    $.ajax({
        url: API_HOST + '/api/Mail/ContactAgent',
        method: 'POST',
        data: contactAddress,
        success: function (data) {
            swal("Sent successfully!", "Message has been sent to the Agent. The agent will contact you", "success");
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