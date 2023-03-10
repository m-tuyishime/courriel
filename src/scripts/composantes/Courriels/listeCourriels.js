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
    // Permet de fermer la popup du courriel au click de la poubelle
    $(".pop-poubelle").on("click", () => {
        fermerPopup($(".pop-courriel"));
    });

    // Lorsqu'un utilisateur tape quelque chose dans le champ de recherche de courriels, filtre les courriels
    $(".recherche-messages input").on("input", event => {
        // Evite de chercher alors qu'il n'y a pas de courriel recu
        if (!chercherStore(storeName)) return

        // Récupère tous les courriel depuis le store 'courriel'
        const courriels = chercherStore(storeName).valeurs;

        // Récupère la valeur actuelle du champ de recherche
        const input = $(event.currentTarget).val();

        // Cache les courriels dont qui ne sont pas similaire au input
        filter(courriels, "courriel", input)
    })
})
