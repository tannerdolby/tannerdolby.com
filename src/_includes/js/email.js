const email = "tannercdolby@gmail.com";

function sendMail() {
    const subject = document.querySelector(".email-subject").value;
    const message = document.querySelector(".email-msg").value;
    window.location.href = `mailto:${email}?subject=${subject}&body=${message}`;
}