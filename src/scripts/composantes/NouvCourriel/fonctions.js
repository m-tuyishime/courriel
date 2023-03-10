const ajouterContactDestinataires = contact => {
    // Clone l'element "#destinataire" pour ce contact
    const $composante = cloneComposante("destinataire", contact);

    // Met a jour la composante avec les informations du contact.
    if (!contact.nom) {
        // Si le contact n'a pas de nom, utilise la première lettre de sa clé comme logo et affiche la clé.
        $composante.find(".destinataire-logo p").text(contact.cle[0].toLowerCase());
        $composante.find(".destinataire-nom").text(raccourcirTexte(contact.cle, "cle"));
    } else {
        // Sinon, utilise la première lettre de son nom en majuscule comme logo et affiche le nom.
        $composante.find(".destinataire-logo p").text(contact.nom[0].toUpperCase());
        $composante.find(".destinataire-nom").text(raccourcirTexte(contact.nom, "nom"));
    }

    // Insere la composante dans la liste des desinataire si elle n'est pas deja la
    if ($(`#destinataire-${contact.id}`).length === 0) $(".container-destinataires").append($composante);

    // si la composante est clickee remplir le champ de recheche de destinataire
    $composante.one("click", () => {
        const $nom = $composante.find(".destinataire-nom").text();
        $("#nouv-destinataire").val($nom);
        $("#nouv-destinataire").attr("name", contact.id);
    })
}