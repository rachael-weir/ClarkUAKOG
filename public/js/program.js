let programData = {
    page: "program",
    title: "title",
    body: [{paragraph: "paragraph"},{paragraph: "paragraph"},{paragraph: "paragraph"}],
    sub_title: "sub_title",
    sub_body: [{paragraph: "paragraph"},{paragraph: "paragraph"},{paragraph: "paragraph"},{paragraph: "paragraph"}]
};

$.getJSON('/get_page_info', {page: "program"}).done(function (data){
    if (data.message === "success"){
        programData = data.data;
        loadPage(programData)
    }
})

function loadPage(data){
    $('#program_title').text(data.title);

    $.each(data.body, function (idx){
        $('.program_col').append(`<p id="${data.body[idx]._id}">${data.body[idx].paragraph}</p>`);
    })

    $('.general_title').append(`<h3>${data.sub_title}</h3>`);

    $.each(data.sub_body, function (idx){
        $('.general_col').append(`<p id="${data.sub_body[idx]._id}">${data.sub_body[idx].paragraph}</p>`);
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
    $('#program_title')
        .attr('contenteditable', 'true')
        .addClass('edit_section')
        .focus();

    $('.program_col')
        .attr('contenteditable', 'true')
        .addClass('edit_section');

    $('.general_title')
        .attr('contenteditable', 'true')
        .addClass('edit_section');

    $('.general_col')
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
    programData.title = $('#program_title').html();

    $.each(programData.body, function (idx){
        const pId = programData.body[idx]._id;
        programData.body[idx].paragraph = $('#'+pId).html();
    })

    programData.sub_title = $('.general_title h3').html();

    $.each(programData.sub_body, function (idx){
        const pId = programData.sub_body[idx]._id;
        programData.sub_body[idx].paragraph = $('#'+pId).html();
    })

    $.post('/edit_page', {page: programData}).done(function (data){
        if (data.message === 'success'){
            console.log(data.info);
            location.href = 'program'
        }
    })
}