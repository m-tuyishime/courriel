$(() => {
  // affiche tous les contacts dans le localstorage
  if (chercherStore("contacts")) {
    const contacts = chercherStore("contacts").valeurs;
    contacts.forEach(contact => ajouterContactCarnet(contact));
  }

  // Lorsqu'un utilisateur tape quelque chose dans le champ de recherche de contacts, filtre les contacts
  $(".recherche-contacts input").on("input", event => {
    // Evite de chercher alors qu'il n'a pas de contact
    if (!chercherStore("contacts")) return;

    // Récupère tous les contacts depuis le store 'contacts'
    const contacts = chercherStore("contacts").valeurs;

    // Récupère la valeur actuelle du champ de recherche
    const input = $(event.currentTarget).val();

    // Cache les contacts dont qui ne sont pas similaire au input
    filter(contacts, "contacts-contact", input)
  })
})