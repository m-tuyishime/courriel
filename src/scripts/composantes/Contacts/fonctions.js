// Crée une carte pour le contact, la met à jour avec les informations passées en argument, et l'insère dans le document HTML
const ajouterContactCarnet = contact => {
    // Clone l'element "#contacts-contact" pour ce contact
    const $composante = cloneComposante("contacts-contact", contact);

    // Met a jour la composante avec les informations du contact.
    if (!contact.nom) {
        // Si le contact n'a pas de nom, mettre un logo d'une clé et afficher la clé.
        $composante.find(".logo-utilisateur").attr("src", "./images/cle.svg");
        $composante.find(".contacts-user").text(raccourcirTexte(contact.cle, "cle"));
        // Sinon, afficher le nom.
    } else {
        $composante.find(".contacts-user").text(raccourcirTexte(contact.nom, "nom"));
    }

    // Insere la composante dans le carnet des contacts si elle n'est pas deja la  
    if ($(`#contacts-contact-${contact.id}`).length === 0) $(".list-contacts").append($composante);

    // Afficher le contact
    $composante.find(".logo-utilisateur, .contacts-user").on("click", () => {
        const $popContact = $("#pop-contact-show");
        $popContact.find(".pop-nom input").val(contact.nom);
        $popContact.find(".pop-contact-cle textarea").val(contact.cle);
        ouvrirPopup($popContact);
    })
    // Affiche le contact et permet la modification des informations
    $composante.find(".logo-modification").on("click", () => {
        const $popContact = $("#pop-contact-edit");
        $popContact.find(".pop-nom input").val(contact.nom);
        $popContact.find(".pop-contact-cle textarea").val(contact.cle);
        $popContact.find(".pop-contact-btn").one("click", () => {
            if ($popContact.find(".pop-contact-cle textarea").val()) {
                sauvegarder("contacts", {
                    nom: $popContact.find(".pop-nom input").val(),
                    cle: $popContact.find(".pop-contact-cle textarea").val(),
                    id: contact.id
                });
                fermerPopup($popContact);
            }
        });

        ouvrirPopup($popContact);
    })
    // Supprime le contact
    $composante.find(".logo-poubelle").on("click", () => {
        supprimer("contacts", {
            id: contact.id
        })

        $composante.remove();
        $(`#destinataire-${contact.id}`).remove();
    })
}