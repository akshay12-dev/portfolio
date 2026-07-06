/* =========================================
   TYPING ANIMATION
========================================= */

const words = [
    "Python Developer",
    "Web Developer",
    "Software Tester",
    "Automation Enthusiast",
    "M.Sc. Computer Science Student"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingElement.textContent = currentWord.substring(0, charIndex++);
    } else {

        typingElement.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentWord.length + 1) {

        speed = 1800;
        isDeleting = true;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;
        wordIndex++;

        if (wordIndex === words.length) {

            wordIndex = 0;
        }
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================================
   MOBILE MENU TOGGLE
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinksEl = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinksEl.classList.toggle("show-menu");

});

navLinksEl.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinksEl.classList.remove("show-menu");

    });

});


/* =========================================
   DARK MODE
========================================= */

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    }

});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}


/* =========================================
   SCROLL TO TOP
========================================= */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";
    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", ()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");
        }

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems = document.querySelectorAll(
".section,.project-card,.skill-card,.timeline-item"
);

function revealOnScroll(){

    const trigger = window.innerHeight * 0.85;

    revealItems.forEach(item=>{

        const top = item.getBoundingClientRect().top;

        if(top < trigger){

            item.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================================
   BUTTON ANIMATION
========================================= */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({

            behavior:"smooth"

        });

    });

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log("Welcome to Akshay Chaubey's Portfolio 🚀");

const filterButtons=document.querySelectorAll(".filter-btn");
const projectCards=document.querySelectorAll(".project-card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

document.querySelector(".filter-btn.active").classList.remove("active");

button.classList.add("active");

const filter=button.dataset.filter;

projectCards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

}

else if(card.classList.contains(filter)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

});

/* ==========================
CONTACT FORM
========================== */

const form=document.getElementById("contactForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you! Your message has been received.");

form.reset();

});

/* =======================
LOADER
======================= */

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},500);

},1200);

});

/* =======================
AUTO YEAR
======================= */

document.querySelector("footer p:last-child").innerHTML=

"© "+new Date().getFullYear()+" Akshay Chaubey. All Rights Reserved.";