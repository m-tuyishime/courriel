$(() => {
    // affiche tous les courriels dans le localstorage dans la liste des courriels
    const storeName = "messagesRecus";
    if (chercherStore(storeName)) {
        $(".aucun-message").removeClass("hidden");
        const courriels = chercherStore(storeName).valeurs;
        courriels.forEach(courriel => ajouterCourrielRecu(courriel));
    }

    // Ouvre le popup d'un couurriel
    $(".courriel").on("click", () => {
        ouvrirPopup($(".pop-courriel"));
    });
    // Permet de fermer tous les popups au click de la croix
    $(".pop-fermer").on("click", () => {
        fermerPopup($(".popup"));
    });
    // Supprimer le courriel
    $(".pop-poubelle").on("click", () => {
        alert("are you sure?");
        $(".background-fade").addClass("hidden");
        $(".pop-courriel").addClass("hidden");
        supprimerCourriel();
    });
})
