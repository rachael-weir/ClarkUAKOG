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