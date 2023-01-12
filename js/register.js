let elEye = document.querySelector(".js-eye");
let elPassword = document.querySelector(".js-password");
let elName = document.querySelector(".js-name");
let elPhone = document.querySelector(".js-phone");
let elEmail = document.querySelector(".js-email");
let elForm = document.querySelector(".js-form");

elEye.addEventListener("mousedown", (evt) => {
  if (elPassword.type == "password") {
    elPassword.type = "text";
  }
});

elEye.addEventListener("mouseup", (evt) => {
  if (elPassword.type == "text") {
    elPassword.type = "password";
  }
});

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://192.168.4.105:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      user_name: elName.value,
      phone: elPhone.value,
      email: elEmail.value,
      password: elPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        location.replace("index.html");
      }
    })
    .catch((err) => console.log(err));
});
