let aboutData = {}

$.getJSON('/get_page_info', {page: 'about'}).done(function (data){
    if (data.message === "success"){
        aboutData = data.data;
        loadPage(aboutData)
    }
})

function loadPage(data){
    $('#about_title').text(data.title);

    $.each(data.body, function (idx){
        $('.about_col').append(`<p id="${data.body[idx]._id}">${data.body[idx].paragraph}</p>`);
    })

    $('.about_col_title').append(`<h3>${data.sub_title}</h3>`)

    $('.list_col').append("<ol class='about_list'></ol>");

    $.each(data.sub_body, function (idx){
        $('.about_list').append(`<li id="${data.sub_body[idx]._id}">${data.sub_body[idx].paragraph}</li>`);
    })
}

$(document).ready(function (){
    $.getJSON('/get_current_user').done(function (data){
        console.log(data);
        if (data['message'] === 'success'){
            console.log(data['data']);
            $('.login_page').remove();
            $('.btn-danger').hide();
            $('.btn-success').hide();
        }else{
            $('.logout').remove();
            $('#controls').remove();
        }
    });
});

function allowEdits(){
    $('#about_title')
        .attr('contenteditable', 'true')
        .addClass('edit_section')
        .focus();

    $('.about_col')
        .attr('contenteditable', 'true')
        .addClass('edit_section');

    $('.about_col_title')
        .attr('contenteditable', 'true')
        .addClass('edit_section');

    $('.list_col')
        .attr('contenteditable', 'true')
        .addClass('edit_section');

    $('.btn-warning').hide();
    $('.btn-success').show();
    $('.btn-danger').show();
}

function cancelEdits(){
    location.reload();
}

function saveEdits(){
    aboutData.title = $('#about_title').html();

    $.each(aboutData.body, function (idx){
        const pId = aboutData.body[idx]._id;
        aboutData.body[idx].paragraph = $('#'+pId).html();
    })

    aboutData.sub_title = $('.about_col_title h3').html();

    $.each(aboutData.sub_body, function (idx){
        const pId = aboutData.sub_body[idx]._id;
        aboutData.sub_body[idx].paragraph = $('#'+pId).html();
    })

    $.post('/edit_page', {page: aboutData}).done(function (data){
        if (data.message === 'success'){
            console.log(data.info);
            location.href = 'about'
        }
    })
}