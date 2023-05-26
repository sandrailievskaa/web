(function() {
    emailjs.init("user_AjNfFcyzVLo04nguqvYPI");
})();

function sendEmail() {

event.preventDefault();

form = document.getElementById("contact-form");

emailjs.sendForm("service_ml3u2ua", "template_z9s7efw", form)
.then(
    function() {
        alert("Your emails has been sent succesfully");
    }, 

    function() {
        alert("Oops something went wrong, please try again");
    }
)

}