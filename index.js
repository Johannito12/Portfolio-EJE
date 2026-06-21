//flash of "_"
const flash = document.querySelector(".trait");
setInterval(() => {  
    flash.style.opacity = flash.style.opacity === "0" ? "1" : "0";
    flash.style.transition = "opacity 0.3s ease";
}, 600);

// flash of "|"
const flash2 = document.querySelector(".trait-2");
let flahInterval = null;

function startFlashing() {
    flash2.style.opacity = "1";
    flahInterval = setInterval(() => {
        flash2.style.opacity = flash2.style.opacity === "0" ? "1" : "0";
        flash2.style.transition = "opacity 0.3s ease";
    }, 600);
}

function stopFlashing() {
    clearInterval(flahInterval);
    flash2.style.opacity = "1";
}

//slide of my stack

const stackEl = document.createElement("span");
stackEl.id = "id_stack";
flash2.insertAdjacentElement("beforebegin", stackEl);

// skills to display in the stack
const skills = [
    {text: "HTML"},
    {text: "CSS"},
    {text: "JavaScript"},
    {text: "React"},
    {text: "Node.js"},
    {text: "Express"},
    {text: "MongoDB"},
    {text: "Git"},
    {text: "GitHub"},
    {text: "Python"},
];

let index = 0;

// function to type text one by one, then erase it before typing the next one
function typeText(text, callback) {
    let i = 0;
    stackEl.textContent = "";
    stopFlashing();//stop the flash of "|"

    function type() {
        if (i < text.length) {
            stackEl.textContent += text[i];
            i++;
            setTimeout(type, 60);
        } else {
            startFlashing();//start the flash of "|"
            setTimeout(() =>{
                eraseText(callback);
            }, 2000);
        }  
    }
    type();
}

function eraseText(callback) {
    function erase() {
        if (stackEl.textContent.length > 0) {
            stackEl.textContent = stackEl.textContent.slice(0, -1);//remove the last character
            setTimeout(erase, 40);//wait before erasing the next character
        } else {
            startFlashing();//start the flash of "|"
            setTimeout(callback, 400);//wait before calling the callback to type the next skill
        }
    }
    erase();
}

function cycle() {
    typeText(skills[index].text, () => {
        index = (index + 1) % skills.length;//passe au suivant, revient a 0 apres le dernier
        cycle();//elle se rappelle elle meme ca cree une boucle infinie
    }); 
}

startFlashing();
cycle();//start of the animation

//--------------------------------------------------------"i" animation after hover

// selection of characteristics
const elements = [
    document.querySelector(".characteristics-1"),
    document.querySelector(".characteristics-2"),
    document.querySelector(".characteristics-3"),
    document.querySelector(".characteristics-4"),
];

elements.forEach((element) => {
    //  On cherche le <i> directement DANS chaque élément
    const icon = element.querySelector("i");

    element.addEventListener("mouseenter", () => {
        icon.style.color = "rgb(255, 0, 255)";
    });

    element.addEventListener("mouseleave", () => {
        icon.style.color = "";
    });
});

// Redirection
// email
document.getElementById("email").addEventListener("click", () => {
    window.open('mailto:johannito23@email.com', '_blank', 'noopener,noreferrer');
});

//github
document.getElementById("github").addEventListener("click", () => {
    window.open('https://github.com/Johannito12', '_blank', 'noopener,noreferrer');
});

//whatsapp
document.getElementById("whatsapp").addEventListener('click', () => {
    const numero = "237659272903";
    const message = encodeURIComponent('Bonjour');
    window.open(`whatsapp://send?phone=${numero}&text=${message}`, '_blank', 'noopener,noreferrer');
});

//Compteur niveau de competence
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".pourcent");
    const section = document.querySelector("#skills"); 

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        let current = 0;

        const duration = 1200;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(eased * target);
            counter.innerText = current + "%";

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "%";
            }
        };

        requestAnimationFrame(update);
    };

    const resetCounters = () => {
        counters.forEach(counter => {
            counter.innerText = "0%";
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
            } else {
                resetCounters();
            }
        });
    }, {
        threshold: 0.4
    });

    observer.observe(section);

});

//Click sur le menu hamburger
(function () {

    // ── 1. Création dynamique de l'overlay ──────────────────────────────────

    const overlay = document.createElement("div");
    overlay.classList.add("mobile-nav-overlay");

    // Bouton de fermeture
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("mobile-nav-close");
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    // Récupère les liens depuis la nav existante et les clone
    const navLinks = document.querySelectorAll("nav ul li a");
    const mobileUl = document.createElement("ul");
    mobileUl.classList.add("mobile-nav-list");

    navLinks.forEach((link, i) => {
        const li = document.createElement("li");
        li.classList.add("mobile-nav-item");
        li.style.setProperty("--i", i); // index pour le délai CSS

        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        a.textContent = link.textContent;

        // Ferme le menu au clic sur un lien
        a.addEventListener("click", () => closeMenu());

        li.appendChild(a);
        mobileUl.appendChild(li);
    });

    overlay.appendChild(closeBtn);
    overlay.appendChild(mobileUl);
    document.body.appendChild(overlay);

    // ── 2. Logique d'ouverture / fermeture ──────────────────────────────────

    const hamburger = document.querySelector(".menu-hamburger");
    const hamburgerIcon = hamburger.querySelector("i");

    function openMenu() {
        overlay.classList.add("is-open");
        hamburgerIcon.classList.replace("fa-bars", "fa-xmark");
        document.body.style.overflow = "hidden"; // bloque le scroll derrière

        // Déclenche l'animation en cascade des items après le slide
        const items = overlay.querySelectorAll(".mobile-nav-item");
        items.forEach((item, i) => {
            item.style.animation = "none";
            // Force reflow pour relancer l'animation à chaque ouverture
            void item.offsetWidth;
            item.style.animation = "";
        });
    }

    function closeMenu() {
        overlay.classList.remove("is-open");
        hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
        overlay.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener("click", () => closeMenu());

    // Ferme au clic sur la zone sombre (hors panneau)
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeMenu();
    });

    // Ferme avec la touche Échap
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

})();

/* ---------- FORMULAIRE CONTACT  mailto ---------- */
function sendForm(e){
    e.preventDefault();
    const f=e.target;
    const nom=f.nom.value.trim(),email=f.email.value.trim(),message=f.message.value.trim();
    const subject='[EJE] '+nom+' contacted you';
    const body=`Nom : ${nom}\nEmail : ${email}\nMessage : ${message}\n\n You can contact me by clicking on the whatsapp icon in the contact section. `;
    window.location.href='mailto:johannitoeje12@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}

// -------------TERMINAL DE CHARGEMENT=======================================
//utilitaire
const $$ = id => document.getElementById(id);

const ts = () => {
    const d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, '0')).join(':');
};

//Dom elements
const loader = $$('loader');
const initLine = $$('initLine');
const phaseTerminal = $$('phase-terminal');
const phaseSuccess = $$('phase-success');
const termBody = $$('termBody');
const progFill = $$('progFill');
const progPct = $$('progPct');
const progLabel = $$('progLabel');

//ETAPE LOG
// delay  : ms depuis le début de la PHASE 2 (après phase-init)
// type   : ok | warn | err | inf | acc
// badge  : texte affiché en couleur
// msg    : message principal
// progress : % de la barre

const STEPS = [
    { delay: 100, type:'inf', badge:'[INIT]', msg:'Démarrage du kernel JS — v8.12.0', progress: 6  },
    { delay: 380, type:'ok', badge:'[OK]', msg:'DOM monté — 247 éléments détectés', progress: 13 },
    { delay: 650, type:'inf', badge:'[SCAN]', msg:'Analyse des modules CSS...', progress: 20 },
    { delay: 900, type:'ok', badge:'[OK]', msg:'Feuilles de style résolues — 0 conflit', progress: 28 },
    { delay: 1150, type:'warn', badge:'[WARN]', msg:'Police Syne — délai réseau 38ms (toléré)', progress: 33 },
    { delay: 1400, type:'ok', badge:'[OK]', msg:'Polices chargées — Fira Code, Syne',  progress: 40 },
    { delay: 1650, type:'acc', badge:'[LOAD]', msg:'Import section : Hero / Accueil', progress: 48 },
    { delay: 1900, type:'ok', badge:'[OK]', msg:'Section ABOUT — profil technique validé', progress: 55 },
    { delay: 2150, type:'ok', badge:'[OK]', msg:'Section FORMATION — 3 diplômes indexés', progress: 62 },
    { delay: 2400, type:'inf', badge:'[BUILD]', msg:'Compilation barres de compétences...', progress: 68 },
    { delay: 2650, type:'ok', badge:'[OK]', msg:'SKILLS : HTML CSS JS Node MongoDB ✓', progress: 74 },
    { delay: 2900, type:'ok', badge:'[OK]', msg:'PROJECTS : EJESAMA, MOMLIST chargés', progress: 80 },
    { delay: 3100, type:'ok', badge:'[OK]', msg:'EmailJS — formulaire CONTACT initialisé', progress: 85 },
    { delay: 3300, type:'ok', badge:'[OK]', msg:'Service Worker — mode offline activé', progress: 90 },
    { delay: 3500, type:'inf', badge:'[CHECK]', msg:'Vérification intégrité des assets...', progress: 94 },
    { delay: 3720, type:'ok', badge:'[OK]', msg:'Responsive — breakpoints validés ✓', progress: 97 },
    { delay: 3940, type:'ok', badge:'[READY]', msg:'PORTFOLIO SYSTEM READY', progress:100 },
    ];

// Injection de chaque ligne de log
const typeClass = {ok:'log-ok',warn:'log-warn',err:'log-err',inf:'log-inf',acc:'log-acc'};

function addLog({ type, badge, msg, progress }) {
    const line = document.createElement('div');
    // Chaque ligne : timestamp + badge coloré + message
    line.className = 'log';
    line.innerHTML =
        `<span class="log-ts">[${ts()}]</span>` +
        `<span class="${typeClass[type] || 'log-inf'}">${badge}</span>` +
        `<span class="log-msg">${msg}</span>`;
    termBody.appendChild(line);
// Auto-scroll vers le bas
    termBody.scrollTop = termBody.scrollHeight;
// Mise à jour barre de progression
    progFill.style.width  = progress + '%';
    progPct.textContent   = progress + '%';
}

//SEQUENCE D'ANIMATION
// PHASE 1 — "Initializing Portfolio_" seul, 1.2 s
setTimeout(() => {
    // Le trait s'étend sous le titre
    initLine.classList.add('expand');
}, 200);

// Après 1.4 s,le terminal apparaît en dessous
setTimeout(() => {
    phaseTerminal.classList.add('visible');

// Lance les étapes de log avec leur délai individuel
    STEPS.forEach((step, i) => {
        setTimeout(() => {
            addLog(step);

// Dernière étape → affiche le banner succès
            if (i === STEPS.length - 1) {
                setTimeout(() => {
                    phaseSuccess.classList.add('visible');
// 1.2 s plus tard → ferme le loader et révèle le portfolio
                    setTimeout(launchPortfolio, 1200);
                }, 300);
            }
        }, step.delay);
    });

}, 1400); // délai de la phase-init (1.4 s)

// ── Révélation progressive du portfolio par sections ───────────
function launchPortfolio() {
    // Fade-out du loader
    loader.classList.add('fade-out');
// Les sections du portfolio à révéler, dans l'ordre
setTimeout(() => {
    ['navbar', 'home', 'homeContent'].forEach(id => {
        const el = $$(id);
        if (el) el.classList.add('revealed');
    })
}, 800); // après 0.8 s
// Les sections suivantes sont observées par IntersectionObserver :
// .revealed est ajouté quand la section entre dans le viewport
// .revealed est retiré quand elle en sort → l'animation se rejoue à chaque passage
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        } else {
            entry.target.classList.remove('revealed');
        }
    });
}, { threshold: 0.2 }); // déclenche quand 12% de la section est visible

setTimeout(() => {
    ['about', 'formation', 'skills', 'projects', 'contact', 'footer'].forEach(id => {
        const el = $$(id);
        if (el) {
            scrollObserver.observe(el);
        }
    });
}, 900); // après 0.9 s, quand les sections sont révélées
}
