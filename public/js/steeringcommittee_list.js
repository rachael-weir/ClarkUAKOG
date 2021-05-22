
function showList(members) {
    $('#sc_list').empty();

    for (let i = 0; i < members.length; i++) {
        console.log(members[i]);
        $('#sc_list').append("<li class='list-group-item'></li>");
    }

    $('#sc_list li')
        .attr("value", function (idx) {
            return members[idx]._id;
        })
        .append("<div class='row'></div>");

    /*$('#sc_list .row').addClass(function (idx) {
        if (idx % 2 === 0) {
            $('#sc_list .row')
                .append("<div class='col-lg-9 d-flex justify-content-center infoDiv_col'></div>")
                .append("<div class='col-lg-3 imgDiv' aria-rowspan='4'></div>");
        } else {
            $('#sc_list .row').append("<div class='col-lg-3 imgDiv' aria-rowspan='4'></div>")
                .append("<div class='col-lg-9 d-flex justify-content-center infoDiv_col'></div>");
        }
    });*/

    /*$('#sc_list .row')
        .append("<div class='col-lg-9 d-flex justify-content-center infoDiv_col'></div>")
        .append("<div class='col-lg-3 imgDiv'></div>");*/

    /*$('.infoDiv_col').append("<div class='row info_title'></div>")
        .append("<div class='row info_name'></div>")
        .append("<div class='row info_year'></div>")
        .append("<div class='row info_major'></div>");*/

    $('.infoDiv_col_title').append(function (idx) {
        return `<h3 class="member_title">${members[idx]?.title}</h3>`;
    });

    $('.infoDiv_col_name').append(function (idx) {
        return `<p class="member_name">${members[idx]?.name}</p>`;
    });

    $('.infoDiv_col_year').append(function (idx) {
        return `<p class="member_year">${members[idx]?.year}</p>`;
    });

    $('.infoDiv_col_major').append(function (idx) {
        return `<p class="member_major">${members[idx]?.major}</p>`;
    });
}

$.getJSON("/get_all_members").done(function (data) {
    if (data.message === "success") {
        showList(data["data"]);
    }
});

function addNewMember() {
    location.href = "steeringcommittee_edit"
}
