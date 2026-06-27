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
// BASE DE DONNÉES ENRICHIE ET STRUCTUREE (VERSION COMMERCIALE 2026)
// =========================================================================
const programDetails = {
    marketing: {
        title: "Marketing stratégique & opérationnel",
        icon: "<i class='fa-solid fa-chart-line'></i>",
        desc: `
            <p class="modal-intro"><strong>Pourquoi cette formation est votre meilleur investissement en 2026 :</strong><br>
            Le marché ne pardonne plus l'improvisation. Face à la digitalisation accélérée et à une concurrence féroce, les entreprises s'arrachent les professionnels capables de générer de la croissance visible. Cette formation intensive vous transforme en un stratège agile, capable de capter l'attention de votre cible et de maximiser le retour sur investissement (ROI) de vos campagnes.</p>
            
            <div class="modal-section">
                <h5>💼 Les 4 Piliers de votre transformation professionnelle :</h5>
                <ul>
                    <li><strong>1. Études de Marché & Consumer Insights :</strong> Décoder le comportement du consommateur moderne et identifier les niches rentables.</li>
                    <li><strong>2. Marketing Digital & Inbound :</strong> Dominer le SEO, la publicité payante (Ads) et le community management pour attirer des leads qualifiés.</li>
                    <li><strong>3. Stratégie de Marque & Branding :</strong> Positionner une offre de manière unique et bâtir une identité de marque mémorable.</li>
                    <li><strong>4. Pilotage de la Performance :</strong> Maîtriser le marketing analytique, les KPI de vente et l'optimisation des tunnels de conversion.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>🌟 Ce qui fait la différence avec notre programme :</h5>
                <ul>
                    <li><strong>Pédagogie 100% Pratique :</strong> 20% de théorie, 80% de cas réels, d'ateliers de Growth Hacking et de manipulation d'outils professionnels.</li>
                    <li><strong>Intervenants Experts :</strong> Animé exclusivement par des directeurs marketing et des consultants digitaux de premier plan.</li>
                    <li><strong>Réseau & Opportunités :</strong> Accès privilégié à notre réseau d'agences et d'entreprises partenaires.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>📈 Pour quels métiers serez-vous armé ?</h5>
                <p>Directeur Marketing (CMO) • Responsable Digital • Chef de Produit • Growth Hacker • Responsable Commercial & Acquisition.</p>
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> <strong>Financement :</strong> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Marketing%20stratégique%20%26%20opérationnel%22."
    },
    
    leadership: {
        title: "Management, Leadership & Coaching",
        icon: "<i class='fa-solid fa-users-gear'></i>",
        desc: `
            <p class="modal-intro"><strong>Pourquoi cette formation est votre meilleur investissement en 2026 :</strong><br>
            Les compétences techniques ne suffisent plus pour diriger. Dans un monde professionnel en quête de sens et de flexibilité, la performance repose sur le capital humain. Cette formation d'élite est un accélérateur de posture conçu pour vous détacher de la simple gestion administrative et faire de vous un leader inspirant, capable de guider ses équipes avec clarté et assurance.</p>
            
            <div class="modal-section">
                <h5>💼 Les 4 Piliers de votre transformation professionnelle :</h5>
                <ul>
                    <li><strong>1. Posture du Leader & Intelligence Émotionnelle :</strong> Développer son charisme, son écoute active et asseoir sa légitimité.</li>
                    <li><strong>2. Management d'Équipe & Délégation :</strong> Structurer les objectifs, motiver à distance ou en présentiel et optimiser le temps.</li>
                    <li><strong>3. Gestion des Conflits & Climat Social :</strong> Désamorcer les tensions complexes et transformer les crises en opportunités d'innovation.</li>
                    <li><strong>4. Posture de Manager-Coach :</strong> Accompagner la montée en compétences individuelles et libérer le potentiel de vos collaborateurs.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>🌟 Ce qui fait la différence avec notre programme :</h5>
                <ul>
                    <li><strong>Pédagogie 100% Pratique :</strong> 20% de théorie, 80% de jeux de rôle, de simulations de crises managériales et de bilans de leadership.</li>
                    <li><strong>Intervenants Experts :</strong> Sessions animées par des coachs certifiés et des directeurs généraux chevronnés.</li>
                    <li><strong>Réseau & Opportunités :</strong> Partage d'expériences avec un réseau exclusif de cadres et dirigeants.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>📈 Pour quels métiers serez-vous armé ?</h5>
                <p>Directeur de Département • Manager d'Équipe • Chef de Projet Senior • Consultant en Management • Directeur des Opérations (COO).</p>
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> <strong>Financement :</strong> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Management%2C%20Leadership%20%26%20Coaching%22."
    },

    si: {
        title: "Management des systèmes d'information",
        icon: "<i class='fa-solid fa-laptop-code'></i>",
        desc: `
            <p class="modal-intro"><strong>Pourquoi cette formation est votre meilleur investissement en 2026 :</strong><br>
            La technologie est le cœur battant de toute stratégie moderne. Face aux cybermenaces, à l'avènement de l'IA et au besoin constant de numérisation, les entreprises recherchent des profils capables de faire le pont entre l'informatique et la direction générale. Ce cursus vous donne les clés pour transformer l'infrastructure technique en un levier de rentabilité et de sécurité.</p>
            
            <div class="modal-section">
                <h5>💼 Les 4 Piliers de votre transformation professionnelle :</h5>
                <ul>
                    <li><strong>1. Gouvernance & Urbanisation du SI :</strong> Maîtriser les architectures modernes et aligner le SI sur les besoins métiers.</li>
                    <li><strong>2. Sécurité & Gestion des Risques :</strong> Mettre en œuvre une politique de cybersécurité solide et un plan de continuité (PCA).</li>
                    <li><strong>3. Gestion de Projets Agiles :</strong> Piloter des déploiements d'outils complexes avec les méthodologies Scrum, ITIL et PRINCE2.</li>
                    <li><strong>4. Data Stratégie & IA :</strong> Exploiter intelligemment la donnée d'entreprise pour orienter les choix de la direction.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>🌟 Ce qui fait la différence avec notre programme :</h5>
                <ul>
                    <li><strong>Pédagogie 100% Pratique :</strong> 20% de théorie, 80% d'analyses d'architectures réelles et d'ateliers pratiques de gestion de crise IT.</li>
                    <li><strong>Intervenants Experts :</strong> Cours dispensés par des DSI en activité et des experts en sécurité numérique certifiés.</li>
                    <li><strong>Réseau & Opportunités :</strong> Connexion directe avec le secteur technologique et les entreprises en pleine transformation digitale.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>📈 Pour quels métiers serez-vous armé ?</h5>
                <p>Directeur des Systèmes d'Information (DSI) • Chef de Projet IT • Consultant en Transformation Digitale • Auditeur SI • Responsable Sécurité (RSSI).</p>
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> <strong>Financement :</strong> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Management%20des%20systèmes%20d'information%22."
    },

    finance: {
        title: "Gestion — Finance, Comptabilité, Audit",
        icon: "<i class='fa-solid fa-calculator'></i>",
        desc: `
            <p class="modal-intro"><strong>Pourquoi cette formation est votre meilleur investissement en 2026 :</strong><br>
            Le monde de l'entreprise évolue à un rythme effréné. Face aux crises économiques, aux mutations technologiques et aux exigences de transparence, une seule catégorie de professionnels reste indispensable : ceux qui maîtrisent les chiffres et la stratégie. Cette formation intensive n'est pas un simple cours théorique. C'est un accélérateur de carrière conçu pour vous transformer en un expert polyvalent, capable de piloter la performance financière d'une organisation, de sécuriser ses processus et de guider les décisions de la direction.</p>
            
            <div class="modal-section">
                <h5>💼 Les 4 Piliers de votre transformation professionnelle :</h5>
                <ul>
                    <li><strong>1. Comptabilité Générale et Fiscalité :</strong> Enregistrer les flux, maîtriser les obligations fiscales locales (SYSCOHADA) et optimiser la fiscalité.</li>
                    <li><strong>2. Comptabilité de Gestion & Analytique :</strong> Décortiquer les coûts pour identifier les leviers de rentabilité et concevoir des KPI percutants.</li>
                    <li><strong>3. Finance d'Entreprise :</strong> Analyser la santé financière globale, piloter la trésorerie et évaluer les projets d'investissement.</li>
                    <li><strong>4. Audit et Contrôle Interne :</strong> Détecter les risques financiers, maîtriser l'audit et garantir la conformité des états financiers.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>🌟 Ce qui fait la différence avec notre programme :</h5>
                <ul>
                    <li><strong>Pédagogie 100% Pratique :</strong> 20% de théorie, 80% d'études de cas réels, de simulations et de manipulation de logiciels professionnels.</li>
                    <li><strong>Intervenants Experts :</strong> Animé par des directeurs financiers, des experts-comptables et des auditeurs seniors en activité.</li>
                    <li><strong>Réseau & Opportunités :</strong> Accès direct à notre réseau d'entreprises partenaires pour vos stages, alternances ou emplois.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>📈 Pour quels métiers serez-vous armé ?</h5>
                <p>Responsable Administratif et Financier (RAF) • Chef Comptable • Contrôleur de Gestion • Auditeur Interne/Externe • Consultant Financier.</p>
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> <strong>Financement :</strong> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Gestion%20%E2%80%94%20Finance%2C%20Comptabilité%2C%20Audit%22."
    },

    rh: {
        title: "Management des Ressources Humaines",
        icon: "<i class='fa-solid fa-people-roof'></i>",
        desc: `
            <p class="modal-intro"><strong>Pourquoi cette formation est votre meilleur investissement en 2026 :</strong><br>
            La guerre des talents et la complexité des cadres juridiques obligent les entreprises à repenser les RH. Le gestionnaire de demain ne se contente plus de gérer les congés, il anticipe les besoins et protège l'organisation contre les risques prud'hommaux. Ce programme complet vous positionne comme un partenaire stratégique incontournable pour la direction.</p>
            
            <div class="modal-section">
                <h5>💼 Les 4 Piliers de votre transformation professionnelle :</h5>
                <ul>
                    <li><strong>1. Administration du Personnel & Code du Travail :</strong> Maîtriser le droit social ivoirien, de la signature à la rupture du contrat.</li>
                    <li><strong>2. Ingénierie de la Paie & Fiscalité des Salaires :</strong> Calculer la paie avec exactitude, gérer la CNPS, l'ITS et les déclarations sociales.</li>
                    <li><strong>3. GPEC & Plan de Développement :</strong> Concevoir une stratégie de gestion prévisionnelle des emplois et optimiser les budgets FDFP.</li>
                    <li><strong>4. Relations Sociales & QVT :</strong> Animer le dialogue social, négocier avec les syndicats et améliorer la qualité de vie au travail.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>🌟 Ce qui fait la différence avec notre programme :</h5>
                <ul>
                    <li><strong>Pédagogie 100% Pratique :</strong> 20% de théorie, 80% d'ateliers pratiques de paie, de simulations d'audits sociaux et de cas réels de licenciement.</li>
                    <li><strong>Intervenants Experts :</strong> Animé par des Directeurs des Ressources Humaines (DRH) chevronnés et des inspecteurs du travail.</li>
                    <li><strong>Réseau & Opportunités :</strong> Accès privilégié à des offres exclusives au sein de notre communauté d'entreprises.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>📈 Pour quels métiers serez-vous armé ?</h5>
                <p>Directeur / Responsable des Ressources Humaines (DRH) • Gestionnaire de la Paie • Responsable Formation • Consultant RH • Responsable Relations Sociales.</p>
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-graduation-cap"></i> <strong>Financement :</strong> Certifié FDFP — Prise en charge disponible pour les entreprises cotisantes.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Management%20des%20Ressources%20Humaines%22."
    },

    surmesure: {
        title: "Programmes de Formation sur mesure",
        icon: "<i class='fa-regular fa-lightbulb'></i>",
        desc: `
            <p class="modal-intro"><strong>Pourquoi cette formule est votre meilleur investissement organisationnel :</strong><br>
            Chaque entreprise est unique, ses défis le sont aussi. Les formations sur catalogue ne répondent pas toujours aux réalités spécifiques de vos équipes sur le terrain. Nos programmes "Sur Mesure" sont dessinés main dans la main avec vos équipes de direction pour résoudre des problématiques concrètes et générer une hausse de productivité immédiate.</p>
            
            <div class="modal-section">
                <h5>💼 Les 4 Étaples de notre démarche d'ingénierie pédagogique :</h5>
                <ul>
                    <li><strong>1. Diagnostic et Immersion :</strong> Analyse technique sur site pour identifier les écarts de performance et de compétences.</li>
                    <li><strong>2. Co-construction du Contenu :</strong> Élaboration d'un déroulé pédagogique exclusif adapté à votre secteur d'activité.</li>
                    <li><strong>3. Animation Contextualisée :</strong> Ateliers pratiques basés à 100% sur les fichiers, documents et cas d'usage de votre entreprise.</li>
                    <li><strong>4. Évaluation & Suivi Post-formation :</strong> Mesure de l'impact opérationnel à 30 et 90 jours pour garantir l'ancrage des acquis.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>🌟 Ce qui fait la différence avec notre offre :</h5>
                <ul>
                    <li><strong>Flexibilité Logistique :</strong> Formations en intra-entreprise (dans vos locaux), en ligne ou dans des espaces dédiés.</li>
                    <li><strong>Ingénierie FDFP incluse :</strong> Nous prenons en charge le montage administratif de votre dossier de financement pour un reste à charge optimisé.</li>
                    <li><strong>Experts Métiers dédiés :</strong> Sélection rigoureuse de formateurs ayant une expérience directe de votre secteur d'activité.</li>
                </ul>
            </div>

            <div class="modal-section">
                <h5>📈 Pour quelles structures ce service est-il conçu ?</h5>
                <p>PME en forte croissance • Grandes entreprises & Multinationales • Institutions Publiques • Organisations Non Gouvernementales (ONG).</p>
            </div>
            <div class="modal-badge-info">
                <i class="fa-solid fa-handshake"></i> <strong>Sur-mesure :</strong> Accompagnement complet au montage du dossier d'agrément FDFP.
            </div>
        `,
        waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20discuter%20d'un%20programme%20de%20%22Formation%20sur%20mesure%22%20pour%20mon%20entreprise."
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