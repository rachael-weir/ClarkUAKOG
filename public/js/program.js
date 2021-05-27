$('.program').append("<div class='col-lg-9 program_col'></div>");

$('.program_col')
    .append("<p>AKOG offers two programs for girls age 9-15 during Clark University's academic year. Our Fall semester " +
        "takes place between October-December and our Spring semester takes place between January- April. AKOG programs " +
        "occur on Saturdays from 11am-2pm in Atwood Hall at Clark University. </p>")
    .append("<p>Our Younger Girls program serves 9-12 year olds. It is our largest program, with approximately 100 " +
        "participants registered annually. The Girls program includes Theme Days intended to foster positive social " +
        "connections and self-confidence.</p>")
    .append("<p>Our Older Girls program serves 13-16 year olds. It provides a mature focus for our older participants. " +
        "The Junior Mentor program includes Theme Days and is specifically designed to help participants develop strong " +
        "leadership skills.</p>");

$('.general_format').append("<div class='col-lg-9 general_col'></div>");

$('.general_col').append("<img src='img/current_logo.PNG' class='akog_logo_general'/>")
    .append("<h3>General Format and Activities of AKOG</h3>")
    .append("<p>AKOG runs every Saturday of the academic year from 10 AM to 2 PM.</p>")
    .append("<p>AKOG offers free home made lunch to all participants.</p>")
    .append("<p>Due to COVID 19, all programs are virtual.</p>")
    .append("<p>Each Saturday at AKOG has a different theme. The theme of the day is explored through interactive, " +
        "educational, and fun activities. Participants are divided into groups based on age and Mentors lead their " +
        "group through the day's activities. Past themes include: Culture Day, Friendship Day, HERstory Day, and " +
        "Science Day.</p>");

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            console.log(data['data']);
        }else{
            $('#controls').remove();
        }
    });
});