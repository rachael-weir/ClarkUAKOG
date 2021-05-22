let member = {
    "title": "title",
    "name": "name",
    "year": "year",
    "major": "major",
    "bio": "brief bio"
}

function load_car(car) {
    $('.car_img').attr('src', car.url);
    $('.car_availability h1').text(car.availability).css("text-transform", "capitalize");
    $('.stockNo_value').text(car.stock_num);
    $('.make_value').text(car.make);
    $('.model_value').text(car.model);
    $('.year_value').text(car.year);
    $('.color_value').text(car.color);
    $('.price_value').text(car.price);

    if(car.availability === "available"){
        $('#availability_btn').text("Mark as Sold");
    }
    else{
        $('#availability_btn').text("Mark as Available");
    }
    console.log(car);
}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const member_id = urlParams.get('member_id');
    console.log(member_id);
    if (member_id) {
        console.log("getJSON");
        $.getJSON('/get_member_by_id').done(function (data) {
            if (data["message"] === "success") {
                member=data["data"];
                showList(data["data"]);
            }
            else{
                console.log("failed");
            }
        });
    }
});

function onDelete() {
    console.log("ondelete1");
    $.post('/delete_member_by_id', {_id: member._id}).done((msg)=>{
        if (msg.message === "success") {
            location.href = "/steeringcommittee_list"
        }
    });
}

function onEdit() {
    location.href = "steeringcommittee_edit.html?member_id=" + member._id;
}