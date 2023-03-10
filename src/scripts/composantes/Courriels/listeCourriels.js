$(() => {
    // affiche tous les courriels dans le localstorage dans la liste des courriels
    const storeName = "messagesRecus";
    if (chercherStore(storeName)) {
        $(".aucun-message").addClass("hidden");
        const courriels = chercherStore(storeName).valeurs;
        courriels.forEach(courriel => ajouterCourrielRecu(courriel));
    } else
        $(".aucun-message").removeClass("hidden");

    // Ouvre le popup d'un couurriel
    $(".ouvre-popup").on("click", () => {
        ouvrirPopup($(".pop-courriel"));
    });
    // Permet de fermer tous les popups au click de la croix
    $(".pop-fermer").on("click", () => {
        fermerPopup($(".popup"));
    });
    // Supprimer le courriel
    $(".pop-poubelle").on("click", () => {
        $(".background-fade").addClass("hidden");
        $(".pop-courriel").addClass("hidden");
    });
})
