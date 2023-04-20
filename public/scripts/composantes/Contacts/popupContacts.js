$(() => {
    // Cette fonction vérifie si le champ texte de la pop-up de contact est rempli,
    // puis change le curseur selon le cas
    $(".pop-contact-cle textarea").on("input", () => {
        if ($(".pop-contact-cle textarea").val()) {
            $(".pop-contact-btn div").addClass("clickable");
            $(".pop-contact-btn").one("mouseover", event => $(event.currentTarget).css("cursor", "pointer"));
        } else {
            $(".pop-contact-btn div").removeClass("clickable");
            $(".pop-contact-btn").one("mouseover", event => $(event.currentTarget).css("cursor", "default"));
        }
    })

    // clone le popup de contact pour afficher les informations d'un contact existant
    // et le rend non modifiable
    const $popContactShow = $("#pop-contact").clone(true);
    $popContactShow.find(".pop-contact-btn").addClass("hidden");
    $popContactShow.find(".pop-header h1").text("Contact");
    $popContactShow.find(".pop-nom input").prop("readonly", true);
    $popContactShow.find(".pop-contact-cle textarea").prop("readonly", true);
    $popContactShow.attr("id", "pop-contact-show");
    $(".background-fade").append($popContactShow);

    // clone le popup de contact pour modifier un contact existant et change le titre
    const $popContactEdit = $("#pop-contact").clone(true);
    $popContactEdit.find(".pop-header h1").text("Modifier le contact");
    $popContactEdit.attr("id", "pop-contact-edit");
    $(".background-fade").append($popContactEdit);

    //ouvrir le popup pour ajouter un contact
    $(".btn-ajouter-contact").on("click", () => {
        ouvrirPopup($("#pop-contact"));
        //sauvegarder le contact dans le localstorage lorsque le boutton d'enregistrement est cliqué
        $("#pop-contact .pop-contact-btn").on("click", () => {
            // Prend la valeur du input représantant le nom du contact
            const nom = $(".pop-contact-nom input").val();
            // Prend la valeur du input représantant la clé du contact et enleve les espaces
            const cle = $(".pop-contact-cle textarea").val().replace(/\s/g, "");

            // Si la clé a une valeur
            if (cle) {
                // Si la clé a la bonne longueur
                if (cle.length === longueurCle) {
                    // Check si la clé est deja utilisée par un autre contact
                    if (chercherStore("contacts")) {
                        const contacts = chercherStore("contacts").valeurs;
                        const contactDejaLa = contacts.some(contact => contact.cle === cle);
                        if (contactDejaLa)
                            return alert("Vous avez déjà un contact associé à cette clé");
                    }
                    // Sauvegarde les informations
                    sauvegarder("contacts", {
                        nom,
                        cle
                    });
                    $(".pop-contact-cle textarea").val("").trigger("input");
                    $(".pop-contact-nom input").val("");
                    // Si la clé n'a pas la bonne longueur
                } else
                    return alert(`La longueur de la clé doit être de ${longueurCle} caractères. \n
          Vous avez ${cle.length}.`)
                // Si la clé n'a pas de valeur
            } else {
                return alert("Vous devez attribuer une clé au contact");
            }
        });

        // Enleve l'ecoute du boutton d'enregistrement quand on ferme la popup
        $(".pop-contact .pop-fermer").one("click", () => $("#pop-contact .pop-contact-btn").off())
    })
})