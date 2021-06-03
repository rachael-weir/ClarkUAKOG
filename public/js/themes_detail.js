let theme = {
    theme: "theme",
    description: "description"
}

$('.btn-success').on('click', function (){
    location.href="themes_list.html";
});

function load_theme(theme) {
    $('.themeName_value').text(theme.theme);
    $('.theme_description').text(theme.description);
}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const theme_id = urlParams.get('theme_id');
    if (theme_id) {
        console.log("getJSON");
        $.getJSON('/get_theme_by_id?theme_id=' + theme_id).done(function (data) {
            if (data["message"] === "success") {
                theme = data["data"];
                load_theme(theme);
            } else {
                console.log("failed");
            }
        });
    }
});

$(document).ready(function () {
    $.getJSON('/get_current_user').done(function (data) {
        console.log(data);
        if (data['message'] === 'success') {
            console.log(data['data']);
            $('.login_page').remove();
        }else{
            $('.logout').remove();
        }
    });
});