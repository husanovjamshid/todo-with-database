let elLogin = document.querySelector(".loginin");
let elRegister = document.querySelector(".registers");

elLogin.addEventListener("click", (evt) => {
  location.replace("login.html");
});

elRegister.addEventListener("click", (evt) => {
  location.replace("register.html");
});
