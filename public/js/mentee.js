$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            console.log(data['data']);
        }else{
            $('#requests .btn-warning').remove();
        }
    });
});

$('.btn-success').on('click', function (){
    location.href="join.html";
});