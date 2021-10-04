let programData = {};

$('.general_col').append("<p>AKOG takes place at Atwood Hall and offers two programs. The younger girl program serves " +
    "ages 9-12, while the older girl program serves ages 13-16. Our programs run Saturdays 11am - 2pm. Additionally, " +
    "AKOG provides free nutritious lunch for all girls. AKOG registration is always open! There is no deadline; we " +
    "always accept new applications.</p>");

$.getJSON('/get_page_info', {page: "program"}).done(function (data){
    if (data.message === "success"){
        programData = data.data;
        loadPage(programData)
        console.log("reading data");
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