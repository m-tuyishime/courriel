// Cache les composantes dont la valeur n'est pas egal au input
const filter = (valeurs, composanteID, input) => {
    // Si l'utilisateur a entré quelque chose dans le champ de recherche
    if (input) {
        let matchs;
        let noMatchs;

        // Critères de similarité pour le carnet de contact
        if (composanteID === "contacts-contact") {
            matchs = valeurs.filter(contact => similaire(contact.cle, input) || similaire(contact.nom, input));
            noMatchs = valeurs.filter(contact => !(similaire(contact.cle, input) || similaire(contact.nom, input)));
        }
        // Critères de similarité pour la liste de courriels
        if (composanteID === "courriel") {
            matchs = valeurs.filter(courriel => similaire(courriel.expediteur, input) || similaire(courriel.sujet, input) || similaire(courriel.message, input) || similaire(courriel.expediteurNom, input));
            noMatchs = valeurs.filter(courriel => !(similaire(courriel.expediteur, input) || similaire(courriel.sujet, input) || similaire(courriel.message, input) || similaire(courriel.expediteurNom, input)));
        }

        // Filtre les valeurs qui correspondent à la recherche
        // et les affiche
        matchs.forEach(match => $(`#${composanteID}-${match.id}`).show());

        // Filtre les valeurs qui ne correspondent pas à la recherche
        // et les cache
        noMatchs.forEach(match => $(`#${composanteID}-${match.id}`).hide());
    } else
        // Si aucun texte n'est entré dans le champ de recherche, affiche tous les valeurs
        $("." + composanteID).show();
}

// Détermine si deux chaînes de caractères sont similaires
const similaire = (valeurs, input) => {
    let compte = 0;
    for (let i = 0; i < valeurs.length; i++) {
        if (input[compte].toLowerCase() !== valeurs[i].toLowerCase()) compte = 0;
        else compte++;
        if (compte === input.length)
            return true;
    }
    return false;
}

// Ouvre une popup en affichant le fond transparent 
const ouvrirPopup = $popup => {
    $(".background-fade").removeClass("hidden");
    $popup.removeClass("hidden");
}

// Ferme une popup
const fermerPopup = $popup => {
    $(".background-fade").addClass("hidden");
    $popup.addClass("hidden");
}

// Clone un element HTML basee sur son id
const cloneComposante = (composanteID, contact) => {
    // Recherche s'il y a déjà une composante pour ce contact dans le document HTML.
    const $composanteExistante = $(`#${composanteID}-${contact.id}`);

    // Clone la composante originale cachée dans le HTML si elle n'existe pas encore
    let $composante;
    if ($composanteExistante.length === 0) {
        $composante = $(`#${composanteID}`).clone();
        // Assigne un id a la nouvelle composante et la rend visible
        $composante.attr("id", `${composanteID}-${contact.id}`);
        $composante.removeClass("hidden");
    } else
        $composante = $composanteExistante;
    return $composante;
}

/* Racourcie la longueur d'un texte pour prendre les 9 premiers et derniers lettres*/
const raccourcirTexte = (texte, type) => {
    // Si le type est une "clé" et la longueur du texte est supérieure à 16 caractères
    if (type === "cle" && texte.length > 16) {
        const nbLetters = 9;  // Définir le nombre de lettres à prendre en compte
        // Prendre les 9 premiers et derniers lettres et ajouter des points de suspension au millieu 
        return texte.substring(0, nbLetters) + "..." + texte.substring(texte.length - nbLetters);
    } else if (type === "nom" && texte.length > 13) {
        let noms = texte.split(" "); // Diviser le nom complet en un tableau de noms

        // Si le nom contient des espaces
        if (noms.length > 1) {
            let prenom = noms[0];
            // Si le prénom est supérieur à 14 caractères, prendre les premiers 14 caractères et ajouter des points de suspension
            if (prenom.length > 14) prenom = prenom.substring(0, 14) + "...";

            let initiales = "";

            for (let i = 1; i < noms.length; i++) { // Parcourez les noms restants
                let nom = noms[i];
                if (nom.length > 0) { // Vérifiez si le nom n'est pas vide
                    initiales += nom[0].toUpperCase() + ". "; // Ajouter l'initiale du nom
                }
            }
            return prenom + " " + initiales.toUpperCase(); // Combine le prénom et les initiales et renvoie le résultat
        } else {
            return texte.substring(0, 16) + "..."; // Si le nom ne contient pas d'espace prendre les 16 premiers caractères et ajouter des points de suspension
        }
    } else if (type === "sujet" && texte.length > 39)
        return texte.substring(0, 39) + "...";
    return texte; // Renvoie le texte si il est déjà assez court
}
