$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            console.log(data['data']);
            $('.login_page').remove();
        }else{
            $('.logout').remove();
            $('#requests .btn-warning').remove();
        }
    });
});

$('.btn-success').on('click', function (){
    location.href="join.html";
});