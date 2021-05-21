function showList(members) {
    console.log("loading members");
    $('#sc_list').empty();
    console.log(members.length);

    for (let i = 0; i < members.length; i++) {
        $('#sc_list').append("<li class='list-group-item'></li>");
        $('#sc_list li').append("<div class='row'></div>");
    }

    $('#sc_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            return 'even_img';
        } else {
            return 'odd_img';
        }
    });

    $('#car_list .row')
        .append("<div class='col-lg-9 d-flex justify-content-center infoDiv'></div>")
        .append("<div class='col-lg-3 imgDiv'></div>");

    $('.infoDiv').append(function (idx) {
        return `<h3 class="member_title">${members[idx].title}</h3>`;
    });

    $('.infoDiv').append(function (idx) {
        return `<p class="member_name">${members[idx].name}</p>`;
    });

    $('.infoDiv').append(function (idx) {
        return `<p class="member_year">${members[idx].year}</p>`;
    });

    $('.infoDiv').append(function (idx) {
        return `<p class="member_major">${members[idx].major}</p>`;
    });

    $('.infoDiv').append(function (idx) {
        return `<p class="member_bio">${members[idx].bio}</p>`;
    });

    $('.infoDiv').append("<div class='row buttonDiv'></div>");

    $('.buttonDiv').append(function (idx) {
            return `<button type="button" class="btn btn-outline-primary showMore_btn">Delete Member</button>`
        });

    $('.buttonDiv')
        .append(function (idx) {
            return `<button type="button" class="btn btn-outline-primary showMore_btn">Edit Member</button>`
        });

/*    $('.showMore_btn').on('click', function () {
        const car_id = $(this).parents('li').attr("value");
        location.href = "detail.html?car_id=" + car_id;
    });*/
}

$.getJSON("/get_all_members").done(function (data) {
    if (data.message === "success") {
        showList(data["data"]);
    }
});

function addNewMember() {
    location.href = "steeringcommittee_edit"
}