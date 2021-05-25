function fillMember(member) {
    $('#src').val(member.src);
    $('#title').val(member.title);
    $('#name').val(member.name);
    $('#year').val(member.year);
    $('#major').val(member.major);
    $('#bio').val(member.bio);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const error_message = urlParams.get('error_message');
const input = JSON.parse(urlParams.get('input'));
console.log(error_message);
if (error_message){
    $('#error_message').text(error_message);
    fillMember(input);
}

const member_id = urlParams.get("member_id");

if (member_id) {
    $.getJSON(`/get_member_by_id?member_id=${member_id}`)
        .done((data)=> {
            if (data["message"] === "success") {
                fillMember(data["data"]);
            }
            else {
                console.log("failed");
            }
        });
}

$('form').on('submit', function () {
    let errorMessage = null
    $('#src').removeClass('is-invalid text-danger');
    $.each($('input,textarea'), function () {
        $(this).removeClass('is-invalid text-danger');
    });
    $.each($('input,textarea,#src'), function () {
        if (!$(this).val()) {
            $(this).addClass('is-invalid text-danger');
            errorMessage = `${$(this).parent().find('label').text()} cannot be empty`;
            return false
        }
    });
    if (errorMessage !== null) {
        $('#error_message').text(errorMessage);
        return false;
    }
    if(member_id){
        $('#edit_member form').append(() => {
            const input = $('<input>')
                .attr("name", "_id")
                .attr("value", member_id);
            return input;
        });
    }
});