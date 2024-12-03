// Initialisation des variables
let points = 0; // L'argent (gils) initial
let autoClickerActive = false; // Détermine si l'auto-clicker est actif
let gysahlPurchased = 0; // Quantité de Gysahls achetés
let gysahlPrice = 10; // Prix initial du Gysahl
let autoClickerInterval = 1000; // Intervalle initial de l'auto-clicker (en ms)

// Sélectionner les éléments d'affichage
const scoreDisplay = document.getElementById('score');
const gysalCountDisplay = document.getElementById('gysalCount');
const gysahlPriceDisplay = document.getElementById('gysahlPrice'); // Ajout de la référence au prix

// Fonction pour mettre à jour l'affichage du score
function updateScore() {
    scoreDisplay.textContent = `gils: ${points}`;
}

// Fonction pour incrémenter le score au clic sur le chocobo
function incrementScore() {
    points++; // Augmente le score de 1
    updateScore(); // Met à jour l'affichage
}

// Fonction pour acheter un Gysahl et activer l'auto-clicker
function purchaseGysahl() {
    // Vérifier si l'utilisateur a assez de gils pour acheter un Gysahl
    if (points >= gysahlPrice) {
        points -= gysahlPrice; // Décrémenter le score de gysahlPrice gils
        gysahlPurchased++; // Augmenter la quantité de Gysahls achetés
        gysalCountDisplay.textContent = gysahlPurchased; // Met à jour le compteur de Gysahls achetés
        updateScore(); // Met à jour l'affichage du score

        // Si ce n'est pas déjà fait, activer l'auto-clicker
        if (!autoClickerActive) {
            autoClickerActive = true;
            // Déclencher l'auto-clicker en fonction du nombre de Gysahls achetés
            setInterval(() => {
                points++; // Augmenter le score chaque seconde
                updateScore(); // Mettre à jour le score
            }, autoClickerInterval); // Intervalle défini par le nombre de Gysahls
        }

        // Augmenter le prix du Gysahl de 190 à chaque achat
        gysahlPrice += 190;
        // Mettre à jour l'affichage du prix du Gysahl
        gysahlPriceDisplay.textContent = `${gysahlPrice} g`;

        // Réduire l'intervalle de l'auto-clicker à mesure que plus de Gysahls sont achetés
        autoClickerInterval = Math.max(1000 - gysahlPurchased * 100, 200); // Réduit de 100 ms à chaque Gysahl acheté (mais ne descend pas en dessous de 200 ms)
    } else {
        // Si l'utilisateur n'a pas assez de gils, afficher un message d'alerte
        alert("Vous n'avez pas assez de gils pour acheter un Gysahl !");
    }
}


// Attacher l'événement de clic pour augmenter le score avec le chocobo
document.getElementById('chocoboButton').addEventListener('click', incrementScore);

// Attacher l'événement de clic pour acheter un Gysahl et démarrer l'auto-clicker
document.getElementById('gysalButton').addEventListener('click', purchaseGysahl);

// Initialiser l'affichage du score
updateScore();

//son on off--------------------////////////////

    // Récupération des éléments
    const toggleImage = document.getElementById("toggleImage");
    const clickSound = document.getElementById("clickSound");

    // Variable pour suivre l'état du son (éteint par défaut)
    let isPlaying = false;

    // Fonction pour basculer entre le son on/off
    toggleImage.addEventListener("click", () => {
        if (isPlaying) {
            // Arrêter le son et passer en mode "off"
            clickSound.pause();
            clickSound.currentTime = 0; // Réinitialise le son au début
            toggleImage.src = "/asset/off.png"; // Image "off"
        } else {
            // Jouer le son et passer en mode "on"
            clickSound.play();
            toggleImage.src = "/asset/on.png"; // Image "on"
        }
        // Inverser l'état
        isPlaying = !isPlaying;
    });