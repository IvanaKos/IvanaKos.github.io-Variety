//START Scroll-Menu
var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
var aboutMeOffsetTop = document.getElementById("about-me").offsetTop;
var nav = document.getElementById("main-header");

window.addEventListener("scroll", function () {
  var currentScrollPos =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPos < prevScrollPos && currentScrollPos > aboutMeOffsetTop) {
    nav.classList.add("visible");
  } else {
    nav.classList.remove("visible");
  }

  prevScrollPos = currentScrollPos;
});

//START Form validation

const form = document.querySelector("#form");
const nameEl = form.querySelector("#name");
const emailEl = form.querySelector("#email");
const messageEl = form.querySelector("#message");

const validateField = (inputEl, min, max, errorMessage) => {
  const value = inputEl.value.trim();

  if (!isEmpty(value)) {
    showError(inputEl, errorMessage);
    return false;
  }

  if (!isBetween(value.length, min, max)) {
    showError(inputEl, `Field must be between ${min} and ${max} characters.`);
    return false;
  }

  removeError(inputEl);
  return true;
};

const checkName = () => {
  return validateField(nameEl, 3, 25, "Name field cannot be blank.");
};

const checkMessage = () => {
  return validateField(messageEl, 1, 5000, "Message field cannot be blank.");
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const checkEmail = () => {
  const email = emailEl.value.trim();

  if (!validateField(emailEl, 1, 250, "Email field cannot be blank.")) {
    return false;
  }

  if (!isEmailValid(email)) {
    showError(emailEl, "Please enter a valid email address.");
    return false;
  }

  removeError(emailEl);
  return true;
};

const isEmpty = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  const formField = input.parentElement;

  input.classList.add("error");

  const error = formField.querySelector("p");
  error.textContent = message;
};

const removeError = (input) => {
  const formField = input.parentElement;

  input.classList.remove("error");

  const error = formField.querySelector("p");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFullNameValid = checkName(),
    isEmailValid = checkEmail(),
    isMessageValid = checkMessage();

  let isFormValid = isFullNameValid && isEmailValid && isMessageValid;

  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "name":
        checkName();
        break;
      case "email":
        checkEmail();
        break;
      case "message":
        checkMessage();
        break;
    }
  })
);
