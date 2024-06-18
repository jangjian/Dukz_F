function togglePasswordVisibility(obj) {
    var passwordInput = document.getElementById("pw");
    var eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "../../../Image/icon/eye/eye-open.svg";
    } else {
        passwordInput.type = "password";
        eyeIcon.src = "../../../Image/icon/eye/eye-close.svg";
    }
}