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

function revealOnScroll(){

    const trigger = window.innerHeight * 0.85;

    document.querySelectorAll(
    ".section,.project-card,.skill-card,.timeline-item"
    ).forEach(item=>{

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

function bindButtonAnimations(){

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});

}

bindButtonAnimations();


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

/* =========================================
   GITHUB PROJECTS (auto-fetched)
========================================= */

const GITHUB_USER = "akshay12-dev";
const projectsGrid = document.getElementById("projectsGrid");
const filterButtonsContainer = document.getElementById("filterButtons");

function escapeHTML(value){

    return String(value).replace(/[&<>"']/g, char=>({

        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"

    })[char]);

}

function projectCardHTML(repo){

    const language = repo.language || "Other";
    const description = repo.description
        ? escapeHTML(repo.description)
        : "No description provided for this repository.";
    const stars = repo.stargazers_count > 0
        ? `<span>★ ${repo.stargazers_count}</span>` : "";
    const homepage = repo.homepage && repo.homepage.trim()
        ? `<a href="${escapeHTML(repo.homepage.trim())}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Live Demo</a>`
        : "";

    return `
    <div class="project-card" data-language="${escapeHTML(language)}">
        <h3>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                ${escapeHTML(repo.name)}
            </a>
        </h3>
        <p>${description}</p>
        <div class="tech">
            <span>${escapeHTML(language)}</span>
            ${stars}
        </div>
        <div class="project-links">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn">GitHub</a>
            ${homepage}
        </div>
    </div>`;

}

function applyFilter(filter){

    document.querySelectorAll(".project-card").forEach(card=>{

        const show = filter === "all" || card.dataset.language === filter;

        card.style.display = show ? "block" : "none";

    });

}

function buildFilterButtons(repos){

    const languages = [...new Set(
        repos.map(repo => repo.language).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    languages.forEach(language => {

        const button = document.createElement("button");

        button.className = "filter-btn";
        button.dataset.filter = language;
        button.textContent = language;

        filterButtonsContainer.appendChild(button);

    });

    filterButtonsContainer.querySelectorAll(".filter-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            const active = filterButtonsContainer.querySelector(".filter-btn.active");

            if(active) active.classList.remove("active");

            button.classList.add("active");

            applyFilter(button.dataset.filter);

        });

    });

}

const LANG_COLORS = {

    Python:"#3572A5",
    JavaScript:"#f1e05a",
    TypeScript:"#3178c6",
    HTML:"#e34c26",
    CSS:"#563d7c",
    Java:"#b07219",
    Kotlin:"#A97BFF",
    "Jupyter Notebook":"#DA5B0B",
    C:"#555555",
    "C++":"#f34b7d",
    "C#":"#178600",
    PHP:"#4F5D95",
    Ruby:"#701516",
    Go:"#00ADD8",
    Rust:"#dea584",
    Shell:"#89e051"

};

function renderLanguageStats(container, totals){

    const entries = Object.entries(totals)
        .filter(([, value]) => value > 0)
        .sort((a, b) => b[1] - a[1]);

    if(entries.length === 0){

        container.innerHTML =
            '<p class="projects-status">No language data yet.</p>';
        return;
    }

    const total = entries.reduce((sum, [, value]) => sum + value, 0);

    container.innerHTML = entries.map(([language, value])=>{

        const percent = Math.max(1, Math.round((value / total) * 100));
        const color = LANG_COLORS[language] || "#00BCD4";

        return `
        <div class="skill">
            <div class="skill-title">
                <span>${escapeHTML(language)}</span>
                <span>${percent}%</span>
            </div>
            <div class="progress">
                <div class="progress-bar" style="width:${percent}%;background:${color}"></div>
            </div>
        </div>`;

    }).join("");

}

async function loadLanguageStats(repos){

    const container = document.getElementById("languageStats");

    if(!container || repos.length === 0) return;

    try{

        const responses = await Promise.all(
            repos.slice(0, 10).map(repo =>
                fetch(repo.languages_url).then(res => {

                    if(!res.ok) throw new Error("languages fetch failed");

                    return res.json();

                })
            )
        );

        const totals = {};

        responses.forEach(languages => {

            Object.entries(languages).forEach(([language, bytes]) => {

                totals[language] = (totals[language] || 0) + bytes;

            });

        });

        renderLanguageStats(container, totals);

    }catch(error){

        console.error("Language stats fallback:", error);

        const totals = {};

        repos.forEach(repo => {

            if(repo.language) totals[repo.language] = (totals[repo.language] || 0) + 1;

        });

        renderLanguageStats(container, totals);

    }

}

async function loadGitHubProjects(){

    try{

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
        );

        if(!response.ok){

            throw new Error("GitHub API returned " + response.status);
        }

        const repos = (await response.json())
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        if(repos.length === 0){

            projectsGrid.innerHTML =
                '<p class="projects-status">No public repositories found.</p';

            document.getElementById("languageStats").innerHTML =
                '<p class="projects-status">No language data yet.</p>';
            return;
        }

        projectsGrid.innerHTML = repos.map(projectCardHTML).join("");

        buildFilterButtons(repos);
        bindButtonAnimations();
        revealOnScroll();
        loadLanguageStats(repos);

    }catch(error){

        console.error("Failed to load GitHub projects:", error);

        projectsGrid.innerHTML =
            '<p class="projects-status">Could not load projects from GitHub. ' +
            '<a href="https://github.com/' + GITHUB_USER + '" target="_blank" ' +
            'rel="noopener noreferrer">View repositories on GitHub</a>.</p>';

        document.getElementById("languageStats").innerHTML =
            '<p class="projects-status">Language stats unavailable right now.</p>';

    }

}

loadGitHubProjects();

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
