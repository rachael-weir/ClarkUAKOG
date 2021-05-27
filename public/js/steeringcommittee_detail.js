$('#member_buttons').append("<div class='buttonDiv'></div>");
$('#member_buttons .buttonDiv').append("<button id='delete_btn' type= 'button' class='btn float-right' style='float: right; background-color: #cdb4db; margin-top: 2%;' onclick='onDelete()'>Delete</button>")
    .append("<button id='edit_btn' type= 'button' class='btn btn-info float-right' style='float: right; background-color: #cdb4db; margin-top: 2%;' onclick='onEdit()'>Edit</button>");

let member = {
    "title": "title",
    "name": "name",
    "year": "year",
    "major": "major",
    "bio": "brief bio",
    "src": "src"
}

$('#steeringcommittee_detail_body').empty();

$('#steeringcommittee_detail_body').append("<div class='row img_row'></div>")
    .append("<div class='row memberTitle_row'></div>")
    .append("<div class='row memberName_row'></div>")
    .append("<div class='row memberYear_row'></div>")
    .append("<div class='row memberMajor_row'></div>")
    .append("<div class='row memberBio_row'></div>");

$('.img_row').append("<img class='member_img'/>");

$('.memberTitle_row').append("<div class='col-lg-6 member_title'><h3></h3></div>");

$('.memberName_row').append("<div class='col-lg-6 member_name'><h5>Name: </h5></div>")
    .append("<div class='col-lg-6 memberName_value'><h5></h5></div>");

$('.memberYear_row').append("<div class='col-lg-6 member_year'><h5>Year: </h5></div>")
    .append("<div class='col-lg-6 memberYear_value'><h5></h5></div>");

$('.memberMajor_row').append("<div class='col-lg-6 member_major'><h5>Major: </h5></div>")
    .append("<div class='col-lg-6 memberMajor_value'><h5></h5></div>");

$('.memberBio_row').append("<div class='col-lg-6 member_bio'><h5>Bio: </h5></div>")
    .append("<div class='col-lg-6 memberBio_value'><p></p></div>");

function load_member(member) {
    $('.member_img').attr('src', member.src);
    $('.member_Title h3').text(member.title);
    $('.memberName_value h5').text(member.name);
    $('.memberYear_value h5').text(member.year);
    $('.memberMajor_value').text(member.major);
    $('.memberBio_value').text(member.bio);
}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const member_id = urlParams.get('member_id');
    console.log(member_id);
    if (member_id) {
        console.log("getJSON");
        $.getJSON('/get_member_by_id?member_id=' + member_id).done(function (data) {
            if (data["message"] === "success") {
                member=data["data"];
                load_member(member);
            }
            else{
                console.log("failed");
            }
        });
    }
});

function onDelete() {
    $.post('/delete_member_by_id', {_id: member._id}).done((msg)=>{
        if (msg.message === "success") {
            location.href = "/steeringcommittee_list.html"
        }
    });
}

function onEdit() {
    location.href = "steeringcommittee_edit.html?member_id=" + member._id;
}