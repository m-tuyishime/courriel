const ajouterCourrielRecu = courriel => {
    // Clone l'element "#courriel" pour ce courriel
    const $composante = cloneComposante("courriel", courriel);

    // Met a jour la composante avec les informations du courriel.
    // Change le logo du courriel pour montrer si il a déjà été lu
    if (courriel.lu) {
        $composante.addClass("courriel-lu");
        $composante.find(".logo-courriel").attr("src", "./images/message-lu.svg");
    } else {
        $composante.addClass("courriel-nonlu");
        $composante.find(".logo-courriel").attr("src", "./images/message-nonlu.svg");
    }

    // Assigne au nom de l'expediteur du courriel sa clé sous format raccourci au besoin
    const cleExpediteur = courriel.expediteur;
    let nomExpediteur = raccourcirTexte(cleExpediteur, "cle");
    // Si l'utilisateur a des contacts
    if (chercherStore("contacts")) {
        // Cherche un contact avec la même clé que l'expéditeur
        const contacts = chercherStore("contacts").valeurs;
        const expediteurContact = contacts.find(contact => contact.cle === cleExpediteur)
        if (expediteurContact) {
            // Assigne au nom de l'expediteur du courriel le nom du contact sous format raccourci au besoin
            // et sauvegarde le lien
            nomExpediteur = raccourcirTexte(expediteurContact.nom, "nom");
            courriel.expediteurNom = expediteurContact.nom;
            sauvegarder("messagesRecus", courriel)
        }
    }

    // Met a jour la composante avec le nom de l'expediteur et le sujet raccourci au besoin
    $composante.find(".expediteur").text(nomExpediteur);
    $composante.find(".objet").text(raccourcirTexte(courriel.sujet, "sujet"));

    // Insere la composante dans la liste des courriels si elle n'est pas deja la
    if ($(`#courriel-${courriel.id}`).length === 0) $(".container-courriels").append($composante);

    // Si la composante est clickée, la remplir d'informations
    $composante.find(".ouvre-popup").one("click", () => {
        // Marque le courriel comme lu et se rappele grace au storage
        $composante.addClass("courriel-lu");
        $composante.find(".logo-courriel").attr("src", "./images/message-lu.svg");
        courriel.lu = true;
        sauvegarder("messagesRecus", courriel);

        // Rempli la popup d'informations sur le courriel en question
        const $popup = $(".pop-courriel");
        $popup.find(".pop-courriel-header h1").text(courriel.sujet);
        $popup.find(".pop-courriel-expediteur").text(courriel.expediteur);
        $popup.find(".pop-courriel-text").text(courriel.message);
        // écouter la suppression de l'e-mail par la popup
        $popup.find(".pop-poubelle").one("click", () => {
            supprimer("messagesRecus", courriel);
            $composante.remove();
            fermerPopup($(".popup"));
        })
    })

    // écouter la suppression de l'e-mail par la liste des emails
    $composante.find(".delete-courriel").one("click", () => {
        supprimer("messagesRecus", courriel);
        $composante.remove();
    })
}