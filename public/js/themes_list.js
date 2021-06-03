function showList(themes) {
    $('#themes_list_body').empty();

    for (let i = 0; i < themes.length; i++) {
        console.log(themes[i]);
        $('#themes_list_body').append("<li class='list-group-item'></li>");
    }

    $('#themes_list_body li')
        .attr("value", function (idx) {
            return themes[idx]._id;
        })
        .append("<div class='row'></div>");

    $('#themes_list_body .row')
        .append("<div class='col-lg-6 themeDiv'></div>")
        .append("<div class='col-lg-6 d-flex justify-content-end buttonDiv'></div>");

    $('.themeDiv').append(function (idx) {
        return `<p class="theme_name">${themes[idx].theme}</p>`;
    });

    $('.buttonDiv')
        .append(function () {
            return `<button type="button" class="btn showMore_btn" style="background-color: #cdb4db;">Show More</button>`
        });

    $('.showMore_btn').on('click', function () {
        const theme_id = $(this).parents('li').attr("value");
        location.href = "themes_detail.html?theme_id=" + theme_id;
    });
}

$.getJSON("/get_all_themes").done(function (data) {
    if (data.message === "success") {
        showList(data["data"]);
    }
});

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