const ajouterCourrielRecu = courriel => {
    // Clone l'element "#courriel"
    const $composante = cloneComposante("courriel", courriel);

    // Met a jour la composante avec les informations du courriel.
    if (!courriel.nom) {
        // Si le courriel n'a pas de nom, mettre un logo d'une clé et afficher la clé.
        $composante.find(".logo-utilisateur").attr("src", "./images/cle.svg");
        $composante.find(".contacts-user").text(raccourcirTexte(courriel.cle, "cle"));
        // Sinon, afficher le nom.
    } else {
        $composante.find(".contacts-user").text(raccourcirTexte(courriel.nom, "nom"));
    }

    // Insere la composante dans le carnet des contacts si elle n'est pas deja la  
    if ($(`#courriel-${courriel.id}`).length === 0) $(".list-contacts").append($composante);
}