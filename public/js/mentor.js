$('.mentor').append("<div class='col-lg-9 mentor_col'></div>");

$('.mentor_col').append("<p>AKOG mentors are undergraduate female-aligned people at Clark University. Interested in becoming a " +
        "mentor? Email our Mentor Coordinators or clarkakog@gmail.com to learn about how to become involved!</p>");

$('.btn-success').on('click', function (){
    location.href="join.html";
});

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            $('.login_page').remove();
        }else{
            $('.logout').remove();
        }
    });
});