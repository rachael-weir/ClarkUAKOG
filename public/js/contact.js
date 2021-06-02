const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
});

const sendMail = (mail) => {
    fetch("http://localhost:3000/send", {
        method: "post",
        body: mail,

    }).then((response) => {
        return response.json();
    });
};

function onSend() {
    location.href = "/success";
}

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