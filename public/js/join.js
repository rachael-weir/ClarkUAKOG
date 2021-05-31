$('.join').append("<div class='col-lg-4 join_mentor_col'></div>")
    .append("<div class='col-lg-4 join_mentee_col'></div>");

$('.join_mentor_col').append("<h3 role='button'>Become a Mentor</h3>")
    .append("<p class='join_p' role='button' onclick='onMentor()'>Click Here!</p>");

$('.join_mentee_col').append("<h3 role='button'>Become a Mentee</h3>")
    .append("<p class='join_p' role='button' onclick='onMentee()'>Click Here!</p>");

function onMentor() {
    location.href = "mentor";
}

function onMentee() {
    location.href = "mentee";
}