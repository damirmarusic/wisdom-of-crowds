const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const search = document.querySelector(".searchmenu");
const body = document.getElementsByTagName("body")[0];

/* Toggle search menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-search'></i>";
        search.velocity({
            display: "none",
            opacity: 0
        }, {
            duration: 400,
            easing: "swing"
        });
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
        search.velocity({
            display: "flex",
            opacity: 1
        }, {
            duration: 400,
            easing: "swing"
        });
    }
}

// Startup
$(document).ready(function () {
    /* Event Listeners */
    toggle.addEventListener("click", toggleMenu, false);
});