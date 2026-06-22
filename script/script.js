// 1. Bloquer le clic droit
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 2. Bloquer le F12 et le Ctrl+Shift+I
document.addEventListener('keydown', function(e) {
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
        button.addEventListener('click', function(e) {
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








      //partie du script pour la modale de la section "Nos Formations" avec les descriptions détaillées et le bouton WhatsApp dynamique
        // Base de données unifiée pour les descriptions profondes et messages dynamiques
        const programDetails = {
            marketing: {
                title: "Marketing stratégique & opérationnel",
                icon: "<i class='fa-solid fa-chart-line'></i>",
                desc: "<p>Ce module d'excellence est conçu pour structurer efficacement votre démarche commerciale sur le marché local et sous-régional :</p><ul><li><strong>Analyse de marché :</strong> Maîtriser le comportement du consommateur ivoirien.</li><li><strong>Stratégie Digitale :</strong> Optimiser votre présence en ligne et générer des leads qualifiés.</li><li><strong>Performance Commerciale :</strong> Bâtir un plan d'action commercial percutant.</li></ul>",
                waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Marketing%20stratégique%20%26%20opérationnel%22.%20Pouvez-vous%20m'indiquer%20la%20démarche%20?"
            },
            leadership: {
                title: "Management, Leadership & Coaching",
                icon: "<i class='fa-solid fa-users-gear'></i>",
                desc: "<p>Devenez le leader que vos équipes ont envie de suivre au quotidien :</p><ul><li><strong>Posture du Manager :</strong> Passer de gestionnaire à leader inspirant.</li><li><strong>Gestion de conflits :</strong> Maintenir un climat social serein et productif.</li><li><strong>Coaching d'équipe :</strong> Développer le plein potentiel de vos collaborateurs.</li></ul>",
                waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Management%2C%20Leadership%20%26%20Coaching%22.%20Pouvez-vous%20m'indiquer%20la%20démarche%20?"
            },
            si: {
                title: "Management des systèmes d'information",
                icon: "<i class='fa-solid fa-laptop-code'></i>",
                desc: "<p>Alignez vos outils technologiques avec les ambitions stratégiques de la direction :</p><ul><li><strong>Gouvernance SI :</strong> Maîtrise des référentiels et urbanisation des systèmes.</li><li><strong>Sécurité & Cybersécurité :</strong> Protéger les données critiques de l'organisation.</li><li><strong>Agilité :</strong> Conduite du changement et implémentation de méthodes agiles (Scrum, Kanban).</li></ul>",
                waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Management%20des%20systèmes%20d'information%22.%20Pouvez-vous%20m'indiquer%20la%20démarche%20?"
            },
            finance: {
                title: "Gestion — Finance, Comptabilité, Audit",
                icon: "<i class='fa-solid fa-calculator'></i>",
                desc: "<p>Sécurisez la trajectoire financière et la conformité légale de votre structure :</p><ul><li><strong>Normes SYSCOHADA :</strong> Maîtrise parfaite des obligations comptables révisées.</li><li><strong>Contrôle de Gestion :</strong> Établir des budgets fiables et des tableaux de bord.</li><li><strong>Fiscalité Ivoirienne :</strong> Optimisation et gestion des déclarations en toute sérénité.</li></ul>",
                waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Gestion%20%E2%80%94%20Finance%2C%20Comptabilité%2C%20Audit%22.%20Pouvez-vous%20m'indiquer%20la%20démarche%20?"
            },
            rh: {
                title: "Management des Ressources Humaines",
                icon: "<i class='fa-solid fa-people-roof'></i>",
                desc: "<p>Pilotez votre capital humain en totale conformité avec la réglementation locale :</p><ul><li><strong>Code du Travail Ivoirien :</strong> Maîtriser l'exécution et la rupture des contrats.</li><li><strong>Gestion de la Paie :</strong> Fiabiliser le traitement des salaires et taxes associées.</li><li><strong>GPEC :</strong> Gestion Prévisionnelle des Emplois et des Compétences.</li></ul>",
                waLink: "https://wa.me/2250708061538?text=Bonjour%20LEMANAGER,%20je%20souhaite%20m'inscrire%20à%20la%20formation%20Certifiée%20FDFP%20en%20%22Management%20des%20Ressources%20Humaines%22.%20Pouvez-vous%20m'indiquer%20la%20démarche%20?"
            },
            surmesure: {
                title: "Programmes de Formation sur mesure",
                icon: "<i class='fa-regular fa-lightbulb'></i>",
                desc: "<p>Nous co-construisons vos solutions pédagogiques selon vos spécificités d'entreprise :</p><ul><li><strong>Audit de compétences :</strong> Analyse précise de vos besoins en amont.</li><li><strong>Flexibilité horaire :</strong> Sessions planifiées selon vos disponibilités opérationnelles.</li><li><strong>Livrables sur-mesure :</strong> Cas pratiques calqués à 100% sur vos défis réels.</li></ul>",
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
        // 5. MOTEUR INTERACTIF DE L'ASSISTANT VIRTUEL (ENVOI FORMSPREE)
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
                appendBotMessage("C'est noté ! Pour vous recontacter efficacement, quel est votre Nom ou le nom de votre Entreprise ?");
                chatbotState.step = 'getName';
                createChatInput('text', 'Ex: veuillez saisir votre nom ou celui de votre entreprise');
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
                    appendBotMessage("Merci. Veuillez saisir une adresse email valide :");
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
                    appendBotMessage("Parfait. Enfin, votre numéro de téléphone (WhatsApp) :");
                    chatbotState.step = 'getPhone';
                    createChatInput('tel', '07 00 00 00 00');
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
                    _subject: `[LEMANAGER - CHATBOT] Nouvelle demande de ${collectedData.nom}`,
                    Module: 'Chatbot Assistant Virtuel',
                    Nom_Complet: collectedData.nom,
                    Email: collectedData.email,
                    Telephone: collectedData.telephone,
                    Besoin_Client: collectedData.besoin
                })
            })
            .then(response => {
                if(response.ok) {
                    appendBotMessage("✨ **Succès !** Vos informations ont été transmises avec succès à l'équipe commerciale de LEMANAGER. Un expert vous recontactera sous 24h. Merci !");
                } else {
                    appendBotMessage("⚠️ Une erreur est survenue lors de la transmission via l'assistant. Veuillez utiliser le formulaire de devis traditionnel ou nous contacter sur WhatsApp.");
                }
            })
            .catch(error => {
                appendBotMessage("⚠️ Erreur de connexion réseau. Vos informations n'ont pas pu être envoyées.");
            });
        }

        // =========================================================
        // 6. SOUMISSION ET FEEDBACK DIRECT DU FORMULAIRE DE DEVIS (ENVOI FORMSPREE)
        // =========================================================
        function handleFormSubmit(event) {
            event.preventDefault();

            const statusMsg = document.getElementById('formStatusMessage');
            statusMsg.className = "form-status-message";
            statusMsg.textContent = "Envoi de votre demande de devis en cours...";

            const name = sanitizeInput(document.getElementById('clientName').value);
            const phone = sanitizeInput(document.getElementById('clientPhone').value);
            const email = sanitizeInput(document.getElementById('clientEmail').value);
            
            const selectElement = document.getElementById('select-sujet');
            const type = selectElement ? selectElement.value : 'Non spécifié';
            const desc = sanitizeInput(document.getElementById('projectDesc').value);

            if (!isValidEmail(email)) {
                statusMsg.className = "form-status-message error";
                statusMsg.textContent = "⚠️ Veuillez entrer une adresse email valide.";
                return;
            }

            const formspreeEndpoint = "https://formspree.io/f/mykqyjnn";

            const payload = {
                _subject: `[LEMANAGER - DEVIS] ${type.toUpperCase()} par ${name}`,
                Module: 'Formulaire de Devis Principal',
                Nom_ou_Entreprise: name,
                Telephone: phone,
                Email: email,
                Pole_Concerne: type,
                Description_du_Projet: desc
            };

            fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    statusMsg.className = "form-status-message success";
                    statusMsg.textContent = "✨ Votre demande de devis a été envoyée avec succès à LEMANAGER !";
                    document.getElementById('devisForm').reset();
                } else {
                    statusMsg.className = "form-status-message error";
                    statusMsg.textContent = "⚠️ Le service d'envoi a rencontré un problème. Veuillez réessayer.";
                }
            })
            .catch(error => {
                statusMsg.className = "form-status-message error";
                statusMsg.textContent = "⚠️ Impossible de joindre le serveur. Vérifiez votre connexion internet.";
            })
            .finally(() => {
                setTimeout(() => {
                    statusMsg.textContent = "";
                    statusMsg.className = "form-status-message";
                }, 6000);
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
        window.addEventListener('click', function(event) {
            const privacyModal = document.getElementById('privacyModal');
            const termsModal = document.getElementById('termsModal');
            
            if (event.target === privacyModal) {
                closeModal('privacyModal');
            }
            if (event.target === termsModal) {
                closeModal('termsModal');
            }
        });