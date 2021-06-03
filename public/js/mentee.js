$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            console.log(data['data']);
            $('.login_page').remove();
        }else{
            $('.logout').remove();
        }
    });
});

$('.btn-success').on('click', function (){
    location.href="join";
});

$('.btn-warning').on('click', function (){
    location.href="contact";
});