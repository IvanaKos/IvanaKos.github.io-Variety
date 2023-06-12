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
