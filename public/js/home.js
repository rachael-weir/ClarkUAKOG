$('.about_info').append("<div class='col-lg-9 about '></div>");

$('.about').append("<div class='row about_img'></div>")
    .append("<div class='row about_title'></div>")
    .append("<div class='row about_body'></div>");

$('.about_img').append("<img src='img/current_logo.PNG' class='akog_logo_about'/>");

$('.about_title').append("<h3 role='button' onclick='onAbout()'>About</h3>");

$('.about_body').append("<p>AKOG is a non-profit youth-mentoring program run by Clark University undergraduate " +
    "female-aligned people and generously funded by Clark University.</p>");

$('.program_info').append("<div class='col-lg-9 program'></div>");

$('.program').append("<div class='row program_img'></div>")
    .append("<div class='row program_title'></div>")
    .append("<div class='row program_body'></div>");

$('.program_img').append("<img src='img/current_logo.PNG' class='akog_logo_program'/>");

$('.program_title').append("<h3 role='button' onclick='onProgram()'>Program</h3>");

$('.program_body').append("<p>AKOG takes place at Atwood Hall and offers two programs. The younger girl program serves " +
    "ages 9-12, while the older girl program serves ages 13-16. Our programs run Saturdays 11am - 2pm. Additionally, " +
    "AKOG provides free nutritious lunch for all girls. AKOG registration is always open! There is no deadline; we " +
    "always accept new applications.</p>");

$('.contact_and_social').append("<div class='col-lg-6 contact'></div>")
    .append("<div class='col-lg-6 social'></div>");

$('.contact').append("<div class='row contact_img'></div>")
    .append("<div class='row contact_title'></div>")
    .append("<div class='row contact_body'></div>");

$('.contact_img').append("<img src='img/current_logo.PNG' class='akog_logo_contact'/>");

$('.contact_title').append("<h3 role='button' onclick='onContact()'>Contact</h3>");

$('.contact_body').append("<p>email: clarkuakog@gmail.com</p>");

$('.social').append("<div class='row social_img'></div>")
    .append("<div class='row social_title'></div>")
    .append("<div class='row social_insta'></div>")
    .append("<div class='row social_fb'></div>");

$('.social_img').append("<img src='img/current_logo.PNG' class='akog_logo_social'/>");

$('.social_title').append("<h3 role='button' onclick='onSocial()'>Social</h3>");

$('.social_insta').append("<p>Instagram: @clarkuakog</p>");

$('.social_fb').append("<p>Facebook: @clarkuAKOG</p>");

function onAbout() {
    location.href = "about";
}

function onProgram() {
    location.href = "program";
}

function onContact() {
    location.href = "contact";
}

function onSocial() {
    location.href = "social";
}



const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("sent")) {
    $('#success_section').append("<div class='row success_div'></div>");
    $(".success_div")
        .append("<p style='padding-top: 1%;'>Your message has been sent to AKOG!</p>")
        .append("<p style='padding-bottom: 1%;'>We will get to it as soon as we can. Thank you!</p>");
    window.history.replaceState({}, document.title, "/");
}

// if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
//     console.info( "This page is reloaded" );
//     location.href = "/";
// }

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