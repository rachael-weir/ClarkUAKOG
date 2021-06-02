$('.about').append("<div class='col-lg-9 about_col'></div>");

$('.about_col').append("<p>All Kinds of Girls (AKOG) was founded at Clark University in 1998 as a single-day program for" +
    "young girls. As AKOG enters our 19th year of service, we now provide 19 weeks of Saturday mentorship programming to" +
    "girls age 9-16 during Clark University's academic year.</p>")
    .append("<p>AKOG strives to:</p>")
    .append("<ol class='about_list'></ol>");

$('.about_list').append("<li>Help girls recognize their own strength by providing them with a safe space to express and " +
    "maintain their true voice</li>")
    .append("<li>Build bridges between girls from Worcester and women from the Clark University community and " +
        "beyond</li>")
    .append("<li>Foster understanding by bringing together girls and women from diverse class, ethnic and racial " +
        "backgrounds</li>")
    .append("<li>Promote self-confidence, high self-esteem, and healthy connections between girls through creative " +
        "activities, group discussions and guest speakers</li>");

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            console.log(data['data']);
            $('.login_page').remove();
        }else{
            $('.logout').remove();
            $('#controls').remove();
        }
    });
});