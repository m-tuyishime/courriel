$(() => {
  // Ouvre le paneau des contacts quand on click sur la selection du destinataire
  let ouvert = false;
  $("#nouv-destinataire").on("click", event => {
    if (ouvert) {
      // Ferme le panel des destinataires
      $(".container-nouv").css("grid-template-rows", "20% 70% 8%");
      $(".container-destinataires").addClass("hidden");
      $(".nouv-info").css("grid-template-rows", "50% 50%");
      // Tourne la fleche de bas vers la gauche
      $("#nouv-destinataire-drop").addClass("rotate-back").removeClass("rotate-90");
      ouvert = false;
    } else {
      // Remplir le paneau des noms ou cles des contacts si il y'en a
      if (chercherStore("contacts")) {
        const contacts = chercherStore("contacts").valeurs;
        contacts.forEach(contact => ajouterContactDestinataires(contact));

        // Ouvre le paneau
        $(".container-nouv").css("grid-template-rows", "50% 40% 8%");
        $(".container-destinataires").removeClass("hidden");
        $(".nouv-info").css("grid-template-rows", "20% 60% 20%");

        // Tourne la fleche de bas vers la droite
        $("#nouv-destinataire-drop").addClass("rotate-90").removeClass("rotate-back");

        // Lorsqu'un utilisateur tape quelque chose dans le champ de recherche de contacts, filtre les contacts
        $(event.currentTarget).on("input", event => {
          // Récupère tous les contacts depuis le store 'contacts'
          const contacts = chercherStore("contacts").valeurs;

          // Récupère la valeur actuelle du champ de recherche
          const input = $(event.currentTarget).val();

          // Cache les contacts dont qui ne sont pas similaire au input
          filter(contacts, "destinataire", input)
        })

        ouvert = true;
      }
    }
  })
  // Ferme le paneau quand on click dans d'autres champs
  $("#nouv-sujet, #nouv-message, #nouv-destinataire-drop").on("click", () => $("#nouv-destinataire").trigger("click"));


  // Change l'apparence du boutton d'envoi pour indiquer si il est clickable ou pas
  $("#nouv-destinataire, #nouv-sujet, #nouv-message").on("input", () => {
    const $destinataire = $("#nouv-destinataire")
    const destinataire = $destinataire.val();
    const sujet = $("#nouv-sujet").val();
    const message = $("#nouv-message").val()
    // Verifie que les champs necessaires sont remplis
    if (destinataire && sujet && message)
      // Rend le boutton d'envoi plus foncé
      $(".nouv-btn-envoyer").removeClass("disabled");
    else
      // Rend le boutton d'envoi plus pale
      $(".nouv-btn-envoyer").addClass("disabled");
  });


  // Rend le boutton d'envoi clickable si les conditions sont remplies
  $(".nouv-btn-envoyer").on("click", () => {
    const $destinataire = $("#nouv-destinataire")
    const destinataire = $destinataire.val();
    const sujet = $("#nouv-sujet").val();
    const message = $("#nouv-message").val();
    const expediteur = $(".adresse").text().replace(/\s/g, "");

    // Verifie que les champs necessaires sont remplis
    if (destinataire && sujet && message) {
      if (sujet.length > 50)
        return alert("La ligne d'objet ne doit pas dépasser 50 caractères.");
      if (message.length > 200)
        return alert("Le message ne doit pas dépasser 200 caractères.");

      // La variable de la clé de l'addresse du déstinataire
      let cle;
      // Si destinataire est une cle
      if (destinataire.length === longueurCle)
        cle = destinataire;
      // Si il n'y a pas de contact dans le localstorage
      else if (!chercherStore("contacts"))
        return alert(`Vous avez aucun contact nommée "${destinataire}"`);
      else {
        // Cherche les contacts
        const contacts = chercherStore("contacts").valeurs;
        // Cherche la valeur de l'attribut "name" du input #nouv-destinataire qui devrait être le
        // id du contact si l'utilisateur a sélectionné un des options de destinataire
        const id = $destinataire.attr("name");
        // Si le id est trouvé
        if (id) {
          // Cheche le contact qui a le même id
          const contact = contacts.find(contact => contact.id = id);
          // Si le contact est trouvé
          if (contact)
            cle = contact.cle;
          else
            return alert(`Vous avez aucun contact nommée "${destinataire}"`);
          // Si l'utilisateur n'a pas sélectionné un des options de destinataire
        } else {
          // Cherche la carte du contact qui affiche le même nom que destinataire parmis les
          // cartes du carnet de contacts
          const $contact = $("p.contacts-user:contains('" + destinataire + "')").parent();
          // Si la carte est trouvé
          if ($contact.length) {
            // Cherche la valeur de l'attribut "id" de $contact
            const componentId = $contact.attr("id");
            // Utilise un regex et substring pour trouvé un id de même format que dans le localstorage
            const contactRegX = /\bcontact-\d+\b/;
            const contactId = componentId.substring(componentId.search(contactRegX));
            // Cherche le contact qui a le même id que contactId dans le localstorage
            const contact = contacts.find(contact => contact.id = contactId);
            cle = contact.cle;
          } else
            return alert(`Vous avez aucun contact nommée "${destinataire}"`);
        }
      }

      // sauvegarde le courriel a envoyer dans le localstorage
      sauvegarder("messagesEnvoyes", {
        expediteur,
        destinataire: cle,
        sujet,
        message
      });

      // Si l'utilisateur s'envoi lui-même un courriel
      if (cle === expediteur)
        sauvegarder("messagesRecus", {
          expediteur,
          destinataire: cle,
          sujet,
          message,
          lu: false
        });

      // Réinitialise les champs
      $("#nouv-destinataire").val("").trigger("input");
      $("#nouv-sujet").val("");
      $("#nouv-message").val("");
    }
  });
})