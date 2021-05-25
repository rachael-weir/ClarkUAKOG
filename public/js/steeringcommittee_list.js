function showList(members) {
    $('#sc_list').empty();

    for (let i = 0; i < members.length; i++) {
        $('#sc_list').append("<li class='list-group-item'></li>");
    }

    $('#sc_list li')
        .attr("value", function (idx) {
            return members[idx]._id;
        })
        .append("<div class='row'></div>");

    /*$('#car_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            return 'even_row';
        } else {
            return 'odd_row';
        }
    });*/

    $('#sc_list .row')
        .append("<div class='col-lg-3 nameDiv'></div>")
        .append("<div class='col-lg-3 titleDiv'></div>")
        .append("<div class='col-lg-3 yearDiv'></div>")
        .append("<div class='col-lg-3 majorDiv'></div>")
        .append("<div class='col-lg-2 d-flex justify-content-end buttonDiv'></div>");

    $('.nameDiv').append(function (idx) {
        return `<a class="member_name">${members[idx].name}</a>`;
    });

    $('.titleDiv').append(function (idx) {
        return `<a class="member_title">${members[idx].title}</a>`;
    });

    $('.yearDiv').append(function (idx) {
        return `<a class="member_year">${members[idx].year}</a>`;
    });

    $('.majorDiv').append(function (idx) {
        return `<a class="member_major">${members[idx].major}</a>`;
    });

    $('.buttonDiv')
        .append(function (idx) {
            return `<button type="button" class="btn btn-outline-primary showMore_btn">Show More</button>`
        });

    $('.showMore_btn').on('click', function () {
        const member_id = $(this).parents('li').attr("value");
        location.href = "steeringcommittee_detail.html?member_id=" + member_id;
    });
}

$.getJSON("/get_all_members").done(function (data) {
    if (data.message === "success") {
        showList(data["data"]);
    }
});