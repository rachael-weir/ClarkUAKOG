let member = {
    title: "title",
    name: "name",
    year: "year",
    major: "major",
    bio: "brief bio",
    src: "src"
}

$('.btn-success').on('click', function (){
    location.href="steeringcommittee_list.html";
});

function load_member(member) {
    $('.member_img').attr('src', member.src);
    $('.member_Title').text(member.title);
    $('.memberName_value').text(member.name);
    $('.memberYear_value').text(member.year);
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
                member = data["data"];
                load_member(member);
            } else {
                console.log("failed");
            }
        });
    }
});

function onDelete() {
    $.post('/delete_member_by_id', {_id: member._id}).done((msg) => {
        if (msg.message === "success") {
            location.href = "/steeringcommittee_list.html"
        }
    });
}

function onEdit() {
    $.get('/edit_member', {_id: member._id}).then((data) => {
        console.log(data);
        location.href = data.url;
    });
}

$(document).ready(function () {
    $.getJSON('/get_current_user').done(function (data) {
        console.log(data);
        if (data['message'] === 'success') {
            console.log(data['data']);
            $('.login_page').remove();
        }else{
            $('.logout').remove();
            $('.buttonDiv').remove();
        }
    });
});