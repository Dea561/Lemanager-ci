// 1. Bloquer le clic droit
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// 2. Bloquer le F12 et le Ctrl+Shift+I
document.addEventListener('keydown', function (e) {
    if (e.key === "F12") {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
    }
});






// partie du script du Header et du Footer pour faire le lien entre les deux et activer la classe active sur les liens correspondants

document.addEventListener('DOMContentLoaded', function () {
    // Sélectionne tous les liens ayant la classe .nav-link (dans le Header ET le Footer)
    const allNavLinks = document.querySelectorAll('.nav-link');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Récupère la valeur du data-target (ex: "about", "services"...)
            const target = this.getAttribute('data-target');

            if (target) {
                // Enlève la classe active de TOUS les liens du site
                allNavLinks.forEach(item => item.classList.remove('active'));

                // Trouve et active TOUS les liens qui ont le même data-target (haut + bas)
                const matchingLinks = document.querySelectorAll(`[data-target="${target}"]`);
                matchingLinks.forEach(match => {
                    match.classList.add('active');
                });
            }
        });
    });
});



// --- CODE DU SLIDER --- pour la bannière d'accueil
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const tabs = document.querySelectorAll('.tab-item');
const progressBar = document.getElementById('progressBar');
const slideIntervalTime = 5000;
let slideTimer;
let progressInterval;
let currentProgress = 0;

function startProgressAndTimer() {
    clearInterval(progressInterval);
    clearTimeout(slideTimer);
    currentProgress = 0;
    progressBar.style.width = '0%';

    progressInterval = setInterval(() => {
        currentProgress += (100 / (slideIntervalTime / 30));
        if (currentProgress <= 100) {
            progressBar.style.width = currentProgress + '%';
        }
    }, 30);

    slideTimer = setTimeout(() => {
        changeSlide(1);
    }, slideIntervalTime);
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    slides[index].classList.add('active');
    tabs[index].classList.add('active');

    startProgressAndTimer();
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    showSlide(currentSlideIndex);
}

function goToSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

startProgressAndTimer();

// --- CODE DES COMPTEURS ---
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 60;

    const startCounting = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + inc > target ? target : count + inc;
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => startCounting(counter));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targetSection = document.querySelector('.statistiques-section');
    if (targetSection) {
        observer.observe(targetSection);
    }
});

///partie du script pour la section "Contactez-nous" avec le formulaire et le défilement automatique vers la section contact



document.addEventListener('DOMContentLoaded', () => {
    // On cible tous les boutons "En savoir plus" de tes cartes
    document.querySelectorAll('.btn-card-action').forEach(button => {
        button.addEventListener('click', function (e) {
            const hrefValue = this.getAttribute('href');

            // On vérifie que le lien contient bien le paramètre attendu
            if (hrefValue && hrefValue.includes('?pole=')) {
                e.preventDefault(); // Empêche le sursaut brusque du navigateur

                // On sépare l'ancre (#contact) du paramètre de pôle (ex: conseil, it...)
                const parts = hrefValue.split('?pole=');
                const targetId = parts[0];  // Récupère "#contact"
                const poleValue = parts[1]; // Récupère la valeur du pôle

                // 1. Défilement fluide et propre vers le formulaire
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Aligne le haut du bloc avec le haut de l'écran
                    });
                }

                // 2. Sélection automatique de la valeur dans le menu déroulant
                const selectSujet = document.getElementById('select-sujet');
                if (selectSujet) {
                    selectSujet.value = poleValue;
                }
            }
        });
    });
});








// =========================================================================
// CORRECTION CLÉ : ACCÈS SÉCURISÉ POUR LE BOUTON MANAGEMENT
// =========================================================================
const programDetails = {
    marketing: {
        title: "Pôle 1 — Marketing stratégique & opérationnel",
        icon: "<i class='fa-solid fa-chart-line'></i>",
        desc: `
            <p class="modal-text-human">Obtenez les clés pour élaborer une stratégie marketing cohérente (positionnement, segmentation, mix marketing) tout en maîtrisant les outils opérationnels du quotidien : communication digitale, gestion de campagnes, étude de marché, fidélisation client. Que vous soyez responsable marketing, entrepreneur ou commercial, vous repartirez avec des méthodes concrètes et directement applicables à votre activité.</p>
            
            <p class="modal-text-human">Pour aller plus loin, les sessions sont animées à 80% par des cas réels et des ateliers pratiques, sous la direction de professionnels et consultants digitaux en activité.</p>

            <div class="modal-human-badge">
                <strong>Métiers visés :</strong> Responsable Marketing • Chef de Produit • Responsable Digital • Directeur de l'Acquisition • Consultant Commercial.
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20au%20%22Pôle%201%20%E2%80%94%20Marketing%20stratégique%20%26%20opérationnel%22."
    },
    
    // LA CLÉ REVIENT À "management" POUR CORRESPONDRE À TON LIEN HTML
    leadership: {
        title: "Pôle 2 — Management, Leadership & Coaching",
        icon: "<i class='fa-solid fa-users-gear'></i>",
        desc: `
            <p class="modal-text-human">Renforcez vos compétences en organisation, délégation, gestion de projet et pilotage de la performance. Nos formations combinent fondamentaux théoriques et mises en situation pratiques pour vous permettre de structurer vos équipes, fixer des objectifs clairs et créer un environnement de travail efficace et motivant.</p>
            
            <p class="modal-text-human">En parallèle, développez une posture de leader authentique : communication impactante, gestion des conflits, intelligence émotionnelle, accompagnement individuel et collectif. À travers des outils de coaching éprouvés, vous apprendrez à révéler le potentiel de vos collaborateurs et à conduire le changement avec confiance.</p>

            <div class="modal-human-badge">
                <strong>Métiers visés :</strong> Directeur des Opérations • Manager d'Équipe • Manager-Coach • Responsable d'Unité • Consultant en Leadership.
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20au%20%22Pôle%202%20%E2%80%94%20Management,%20Leadership%20%26%20Coaching%22."
    },

    rh: {
        title: "Pôle 3 — Gestion des Ressources Humaines",
        icon: "<i class='fa-solid fa-users-line'></i>",
        desc: `
            <p class="modal-text-human">Maîtrisez les leviers indispensables du développement du capital humain : du recrutement stratégique à la gestion prévisionnelle des emplois et des compétences (GPEC), en passant par l'ingénierie de la formation et le pilotage de la paie. Ce parcours vous donne les clés pour structurer un climat social serein et aligner la politique RH avec la vision de votre entreprise.</p>
            
            <p class="modal-text-human">Cette formation est ancrée dans le cadre légal ivoirien, alternant études de cas juridiques, gestion des contentieux et manipulation d'outils de pilotage social avec des Directeurs RH chevronnés.</p>

            <div class="modal-human-badge">
                <strong>Métiers visés :</strong> Directeur / Responsable des Ressources Humaines • Chargé de Recrutement • Responsable Formation • Gestionnaire de Paie.
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20au%20%22Pôle%203%20%E2%80%94%20Gestion%20des%20Ressources%20Humaines%22."
    },

    si: {
        title: "Pôle 4 — Management des Systèmes d’Information",
        icon: "<i class='fa-solid fa-laptop-code'></i>",
        desc: `
            <p class="modal-text-human">Savoir aligner les systèmes d’information sur la stratégie globale devient essentiel. Ce pôle forme les responsables IT, DSI et décideurs à la gouvernance des SI, à la gestion de projets informatiques, à la cybersécurité et à la transformation digitale. Vous apprendrez à faire du système d’information un véritable levier de compétitivité, et non une simple contrainte technique.</p>
            
            <p class="modal-text-human">Ce programme met l'accent sur la gestion des risques et la gouvernance, avec des retours d'expérience directs de DSI en activité.</p>

            <div class="modal-human-badge">
                <strong>Métiers visés :</strong> Directeur des Systèmes d'Information (DSI) • Chef de Projet IT • Consultant Digital • Responsable Sécurité (RSSI).
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20au%20%22Pôle%204%20%E2%80%94%20Management%20des%20Syst%C3%A8mes%20d%E2%80%99Information%22."
    },

    finance: {
        title: "Pôle 5 — Gestion — Finance, Comptabilité, Audit",
        icon: "<i class='fa-solid fa-calculator'></i>",
        desc: `
            <p class="modal-text-human">Ce pôle couvre l’ensemble de la chaîne de gestion financière : comptabilité générale et analytique, contrôle de gestion, analyse financière, fiscalité et techniques d’audit. Conçu pour les comptables, gestionnaires et dirigeants, il vous permettra de lire, d’interpréter et de piloter les chiffres de votre entreprise avec rigueur, tout en sécurisant vos pratiques face aux exigences réglementaires.</p>
            
            <p class="modal-text-human">Une formation axée à 80% sur des études de cas comptables et fiscaux concrets, animée par des experts-comptables et directeurs financiers chevronnés.</p>

            <div class="modal-human-badge">
                <strong>Métiers visés :</strong> Responsable Financier (RAF) • Chef Comptable • Contrôleur de Gestion • Auditeur Interne/Externe.
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20au%20%22Pôle%205%20%E2%80%94%20Gestion%20%E2%80%94%20Finance%2C%20Comptabilit%C3%A9%2C%20Audit%22."
    },

    surmesure: {
        title: "Pôle 6 — Programmes de Formation sur mesure",
        icon: "<i class='fa-regular fa-lightbulb'></i>",
        desc: `
            <p class="modal-text-human">Chaque organisation fait face à des défis uniques qui exigent des réponses parfaitement ajustées. Les programmes sur catalogue ne s'alignent pas toujours sur les réalités quotidiennes de vos équipes sur le terrain. Notre offre sur mesure est conçue pour co-construire avec vos directions des parcours d'apprentissage exclusifs, directement calqués sur vos processus internes pour déclencher un impact opérationnel immédiat.</p>
            
            <p class="modal-text-human">De l'analyse de vos besoins sur site jusqu'à l'évaluation finale des compétences, nos experts métiers adaptent entièrement les contenus pour correspondre à vos outils et vos fichiers d'entreprise.</p>

            <div class="modal-human-badge">
                <strong>Public concerné :</strong> PME en croissance • Grandes Entreprises • Institutions Publiques • Organisations Non Gouvernementales (ONG).
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-handshake"></i> Accompagnement complet pour le montage administratif de votre dossier d'agrément FDFP.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20échanger%20avec%20un%20conseiller%20au%20sujet%20d'un%20programme%20de%20%22Formation%20sur%20mesure%22%20pour%20notre%20structure."
    }
};
// Fonctions de contrôle de la Fenêtre Pop-up (Modale)
function openMoreDetails(id) {
    const data = programDetails[id];
    if (data) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalIcon').innerHTML = data.icon;
        document.getElementById('modalDescription').innerHTML = data.desc;
        document.getElementById('modalWhatsAppBtn').setAttribute('href', data.waLink);

        document.getElementById('detailsModal').classList.add('active');
    }
}

function closeMoreDetails() {
    document.getElementById('detailsModal').classList.remove('active');
}

// Redirection automatique via les boutons d'inscription directs
function redirectToWhatsApp(formationName) {
    const phoneNumber = "2250708061538";
    let message = `Bonjour LEMANAGER, je souhaite avoir des informations et m'inscrire à la formation Certifiée FDFP en : "${formationName}". Pouvez-vous m'indiquer la démarche ?`;

    if (formationName === 'Formation sur mesure') {
        message = `Bonjour LEMANAGER, je souhaite discuter d'un programme de "Formation sur mesure" pour mon entreprise.`;
    }

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// Fermer si l'utilisateur clique en dehors de la boîte blanche
window.onclick = function (event) {
    const modal = document.getElementById('detailsModal');
    if (event.target == modal) {
        modal.classList.remove('active');
    }
}








// partie du script pour les onglets de la section "Nos Offres" avec les descriptions détaillées
function switchOffersTab(event, tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-trigger');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}




//partie du script pour le carousel de la section "Nos Produits" avec les petits points indicateurs et le défilement automatique
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("carouselTrack");
    const boxes = track.querySelectorAll(".product-category-box");
    const dotsContainer = document.getElementById("carouselDots");

    let currentIndex = 0;
    const cardWidth = 250; // Largeur d'un produit
    const gap = 20; // Espace entre les produits

    // Calculer combien d'étapes de défilement on a besoin
    // On fait défiler une carte à la fois
    const totalSteps = boxes.length - 1;

    // Générer les petits points indicateurs de manière dynamique
    for (let i = 0; i <= totalSteps; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".dot");

    function goToSlide(index) {
        // Empêcher de dépasser les bornes
        if (index > totalSteps) index = 0;
        if (index < 0) index = totalSteps;

        currentIndex = index;

        // Calcul du décalage en pixels
        const amountToMove = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${amountToMove}px)`;

        // Mettre à jour la couleur des points
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    // Défilement automatique toutes les 3 secondes
    let autoSlide = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 3000);

    // Mettre en pause le défilement si l'utilisateur passe sa souris dessus
    const container = document.querySelector(".shop-right-carousel-container");
    container.addEventListener("mouseenter", () => clearInterval(autoSlide));
    container.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000);
    });
});



// =========================================================
// GESTION DU FORMULAIRE DE DEVIS PRINCIPAL (LEMANAGER)
// =========================================================
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const form = event.target;
    const statusMessageDiv = document.getElementById("formStatusMessage");
    const submitBtn = form.querySelector(".submit-form-btn");

    // 1. Changement d'état du bouton pendant l'envoi
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours...";
    }

    // 2. Récupération automatique des données du formulaire
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = sanitizeInput(value); // Sécurise les entrées textuelles
    });

    // Ajout des métadonnées pour ton mail de réception Formspree
    data["_subject"] = `[LEMANAGER - SITE DEVIS] Demande de ${data.nom_complet}`;
    data["Module"] = "Formulaire Devis Principal";

    // 3. Envoi vers ton endpoint Formspree
    const formspreeEndpoint = "https://formspree.io/f/mykqyjnn";

    fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Message de succès stylisé dans la zone dédiée
                statusMessageDiv.className = "form-status-message success";
                statusMessageDiv.innerHTML = "✨ **Succès !** Votre demande de devis a bien été transmise à l'équipe de LEMANAGER. Nous vous recontacterons rapidement.";
                statusMessageDiv.style.color = "#28a745"; // Vert
                form.reset(); // Vide les champs du formulaire
            } else {
                throw new Error("Erreur serveur Formspree");
            }
        })
        .catch(error => {
            console.error("Détails erreur formulaire :", error);
            // Message d'erreur stylisé
            statusMessageDiv.className = "form-status-message error";
            statusMessageDiv.innerHTML = "⚠️ **Une erreur est survenue.** Impossible d'envoyer le formulaire pour le moment. Veuillez nous contacter directement via WhatsApp.";
            statusMessageDiv.style.color = "#dc3545"; // Rouge
        })
        .finally(() => {
            // Rétablit le bouton après l'opération
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "J'envoie mon message";
            }
        });
}

/// =========================================================
// 1. LOGIQUE STRUCTURELLE DE FERMETURE/OUVERTURE DU CHAT
// =========================================================
function closeChatbot() {
    document.getElementById('chatbotWindow').style.display = 'none';
    document.querySelector('.chatbot-bubble').style.display = 'flex';
}

function openChatbot() {
    document.querySelector('.chatbot-bubble').style.display = 'none';
    document.getElementById('chatbotWindow').style.display = 'flex';

    const body = document.getElementById('chatbotBody');
    body.scrollTop = body.scrollHeight;
}

// =========================================================
// 2. LOGIQUE DE L'ACCORDÉON FAQ (EVENEMENT CLIC INTEGRÉ)
// =========================================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.faq-icon');

        if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
            answer.style.maxHeight = '0px';
            icon.textContent = '+';
        } else {
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = '0px');
            document.querySelectorAll('.faq-icon').forEach(ic => ic.textContent = '+');

            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = '-';
        }
    });
});

// =========================================================
// 3. FENÊTRES MODALES JURIDIQUES (OPEN/CLOSE)
// =========================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fermeture des modales si clic en dehors
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('legal-modal')) {
        closeModal(event.target.id);
    }
});

// =========================================================
// 4. SÉCURISATION SANITIZE & VALIDATION EMAIL
// =========================================================
function sanitizeInput(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML.trim();
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// =========================================================
// MOTEUR INTERACTIF DE L'ASSISTANT VIRTUEL (NOM + ENTREPRISE SEPARÉS)
// =========================================================
let chatbotState = { step: '', data: {} };

function appendBotMessage(text) {
    const body = document.getElementById('chatbotBody');
    const msg = document.createElement('div');
    msg.className = 'msg bot-msg';
    msg.innerHTML = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}

function appendUserMessage(text) {
    const body = document.getElementById('chatbotBody');
    const msg = document.createElement('div');
    msg.className = 'msg user-msg';
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}

function handleBotOption(optionKey, optionLabel) {
    appendUserMessage(optionLabel);
    document.getElementById('chatOptions').style.display = 'none';

    chatbotState.data.besoin = optionLabel;

    setTimeout(() => {
        appendBotMessage("C'est noté ! Pour commencer, quel est votre Nom & Prénoms ?");
        chatbotState.step = 'getName';
        createChatInput('text', 'Ex: Saisissez votre nom complet');
    }, 800);
}

function createChatInput(type, placeholder) {
    const body = document.getElementById('chatbotBody');
    const input = document.createElement('input');
    input.type = type;
    input.className = 'chat-input-internal';
    input.placeholder = placeholder;

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const val = sanitizeInput(this.value);
            if (!val) return;

            appendUserMessage(val);
            this.remove();
            processChatStep(val);
        }
    });

    body.appendChild(input);
    input.focus();
    body.scrollTop = body.scrollHeight;
}

function processChatStep(value) {
    setTimeout(() => {
        if (chatbotState.step === 'getName') {
            chatbotState.data.nom = value;
            appendBotMessage("Quel est le nom de votre Entreprise ? (Écrivez 'Particulier' si vous n'en avez pas)");
            chatbotState.step = 'getCompany';
            createChatInput('text', 'Ex: LEMANAGER, SARL, etc.');
        }
        else if (chatbotState.step === 'getCompany') {
            chatbotState.data.entreprise = value;
            appendBotMessage("Merci. Quelle est votre adresse email ?");
            chatbotState.step = 'getEmail';
            createChatInput('email', 'exemple@domaine.com');
        }
        else if (chatbotState.step === 'getEmail') {
            if (!isValidEmail(value)) {
                appendBotMessage("⚠️ Format d'email incorrect. Veuillez réessayer :");
                createChatInput('email', 'exemple@domaine.com');
                return;
            }
            chatbotState.data.email = value;
            appendBotMessage("Parfait. Enfin, quel est votre numéro de téléphone (WhatsApp) ?");
            chatbotState.step = 'getPhone';
            createChatInput('tel', 'Ex: 07 00 00 00 00');
        }
        else if (chatbotState.step === 'getPhone') {
            chatbotState.data.telephone = value;
            appendBotMessage("🔄 Traitement et envoi de vos informations en cours...");
            sendDataToCompanyMail(chatbotState.data);
        }
    }, 800);
}

function sendDataToCompanyMail(collectedData) {
    const formspreeEndpoint = "https://formspree.io/f/mykqyjnn";

    fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `[LEMANAGER - CHATBOT] Nouvelle demande de ${collectedData.nom} (${collectedData.entreprise})`,
            Module: 'Chatbot Assistant Virtuel',
            Nom_Collaborateur: collectedData.nom,
            Nom_Entreprise: collectedData.entreprise,
            Email: collectedData.email,
            Telephone: collectedData.telephone,
            Besoin_Client: collectedData.besoin
        })
    })
        .then(response => {
            if (response.ok) {
                appendBotMessage("✨ **Succès !** Vos informations ont été transmises à l'équipe commerciale de LEMANAGER. Un expert vous recontactera sous 24h. Merci !");
            } else {
                appendBotMessage("⚠️ Une erreur est survenue. Veuillez utiliser le formulaire de devis traditionnel ou nous contacter sur WhatsApp.");
            }
        })
        .catch(error => {
            appendBotMessage("⚠️ Erreur de connexion réseau. Vos informations n'ont pas pu être envoyées.");
        });
}

//parties privacy et termes

// =========================================================
// 6. GESTION DES FENÊTRES MODALES (PRIVACY & TERMS)
// =========================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Bloque le défilement de la page arrière-plan
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Rétablit le défilement de la page
        document.body.style.overflow = '';
    }
}

// Ferme la modale si l'utilisateur clique en dehors de la boîte blanche
window.addEventListener('click', function (event) {
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');

    if (event.target === privacyModal) {
        closeModal('privacyModal');
    }
    if (event.target === termsModal) {
        closeModal('termsModal');
    }
});