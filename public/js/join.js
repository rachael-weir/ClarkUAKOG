$('.join').append("<div class='col-lg-4 join_mentor_col'></div>")
    .append("<div class='col-lg-4 join_mentee_col'></div>");

$('.join_mentor_col').append("<img src='img/current_logo.PNG' class='akog_logo_mentor'/>")
    .append("<h3 role='button' onclick='onMentor()'>Become a Mentor</h3>");

$('.join_mentee_col').append("<img src='img/current_logo.PNG' class='akog_logo_mentor'/>")
    .append("<h3 role='button' onclick='onMentee()'>Become a Mentee</h3>");

function onMentor() {
    location.href = "mentor";
}

function onMentee() {
    location.href = "mentee";
}