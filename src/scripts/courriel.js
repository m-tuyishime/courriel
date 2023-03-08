// Détermine si deux chaînes de caractères sont similaires
const similaire = (valeurs, input) => {
  let compte = 0;
  for (let i = 0; i < valeurs.length; i++) {
    if (input[compte].toLowerCase() !== valeurs[i].toLowerCase()) compte = 0;
    else compte++;
    if (compte === input.length)
      return true;
  }
  return false;
}

// Supprime un objet dans le localstorage 
const supprimer = (key, value) => {
  // Cherche le store avec la clé passée en paramètre et si celui-ci est null ou undefined, crée un nouveau store
  let store = chercherStore(key);
  // Recherche l'index de l'objet dans le store grâce à son id
  const indexToRemove = store.values.findIndex(obj => obj.id === value.id);
  // Enleve l'objet de son tableau
  store.values.splice(indexToRemove, 1);
  // Sauvegarde le nouveau store sans l'objet dans le localstorage
  store = JSON.stringify(store);
  localStorage.setItem(key, store);
};

// Sauvegarde un objet dans le localstorage 
const sauvegarder = (key, value) => {
  // Cherche le store avec la clé passée en paramètre et si celui-ci est null ou undefined, crée un nouveau store 
  let store = chercherStore(key) ?? {
    values: [],
    insertCount: 0
  };
  // Si l'objet à sauvegarder ne possède pas d'id, on lui en ajoute un en utilisant la variable insertCount du store
  if (value.id === undefined) {
    value.id = `${key}-${store.insertCount}`;
    store.insertCount++;
  }
  // Recherche l'index de l'objet dans le store grâce à son id
  const index = store.values.findIndex(obj => obj.id === value.id);
  // Si l'objet est déjà présent dans le store, on le met à jour
  if (index != -1)
    store.values[index] = value;
  else {
    store.values.push(value);
  }
  // On transforme le store en chaîne de caractères JSON pour pouvoir le stocker dans le localstorage
  store = JSON.stringify(store);
  localStorage.setItem(key, store);

  // On crée un événement de stockage avec la clé et la valeur sauvegardées
  const event = new StorageEvent("storage", {
    key,
    newValue: JSON.stringify(value),
  });
  window.dispatchEvent(event);
};

// Cherche un store dans le localstorage avec la clé passée en paramètre et le renvoie sous forme d'objet
const chercherStore = key => JSON.parse(localStorage.getItem(key));

// Contracte le panel des destinataires
const destinataireContract = () => {
  $(".container-nouv").css("grid-template-rows", "20% 70% 8%");
  $(".container-destinataires").addClass("hidden");
  $(".nouv-info").css("grid-template-rows", "50% 50%");
}

// Ouvre une popup en affichant le fond transparent 
const ouvrirPopup = $popup => {
  $(".background-fade").removeClass("hidden");
  $popup.removeClass("hidden");
}

// Ferme une popup
const fermerPopup = $popup => {
  $(".background-fade").addClass("hidden");
  $popup.addClass("hidden");
}

const cloneComposante = (composanteID, contact) => {
  // Recherche s'il y a déjà une composante pour ce contact dans le document HTML.
  const $composanteExistante = $(`#${composanteID}-${contact.id}`);
  
  // Clone la composante originale cachée dans le HTML si elle n'existe pas encore
  let $composante;
  if ($composanteExistante.length === 0) {
    $composante = $(`#${composanteID}`).clone();
    // Assigne un id a la nouvelle composante et la rend visible
    $composante.attr("id", `${composanteID}-${contact.id}`);
    $composante.removeClass("hidden");
  } else 
    $composante = $composanteExistante;
  return $composante;
}

const ajouterContactDestinataires = contact => {
  const $composante = cloneComposante("destinataire", contact);

  // Met a jour la composante avec les informations du contact.
  if (!contact.nom) {
    $composante.find(".destinataire-logo p").text(contact.cle[0].toLowerCase());
    $composante.find(".destinataire-nom").text(raccourcirTexte(contact.cle, "cle"));
  } else {
    $composante.find(".destinataire-logo p").text(contact.nom[0].toUpperCase());
    $composante.find(".destinataire-nom").text(raccourcirTexte(contact.nom, "nom"));
  }
  $composante.find(".contacts-user").css("fontSize", "20px");

  // Insere la composante dans le carnet des contacts si elle n'est pas deja la
  if ($(`#contacts-contact-${contact.id}`).length === 0) $(".list-contacts").append($composante);
}

// Crée une carte pour le contact, la met à jour avec les informations passées en argument, et l'insère dans le document HTML
const ajouterContactCarnet = contact => {
  const $composante = cloneComposante("contacts-contact", contact);

  // Met a jour la composante avec les informations du contact.
  if (!contact.nom) {
    $composante.find(".logo-utilisateur").attr("src", "./images/cle.svg"); 
    $composante.find(".contacts-user").text(raccourcirTexte(contact.cle, "cle"));
  } else {
    $composante.find(".contacts-user").text(raccourcirTexte(contact.nom, "nom"));
  }
  $composante.find(".contacts-user").css("fontSize", "20px");

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
      if($popContact.find(".pop-contact-cle textarea").val()) {
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
    $composante.off();
    $composante.remove();
  })
}

/* Racourcie la longueur d'un texte pour prendre les 9 premiers et derniers lettres*/
const raccourcirTexte = (texte, type) => {
  // Si le type est une "clé" et la longueur du texte est supérieure à 16 caractères
  if (type === "cle" && texte.length > 16) {
    const nbLetters = 9;  // Définir le nombre de lettres à prendre en compte
    // Prendre les 9 premiers et derniers lettres et ajouter des points de suspension au millieu 
    return texte.substring(0, nbLetters) + "..." + texte.substring(texte.length - nbLetters);
  } else if (type === "nom" && texte.length > 13) {
    let noms = texte.split(" "); // Diviser le nom complet en un tableau de noms
    
    // Si le nom contient des espaces
    if (noms.length > 1) { 
      let prenom = noms[0]; 
      // Si le prénom est supérieur à 14 caractères, prendre les premiers 14 caractères et ajouter des points de suspension
      if (prenom.length > 14) prenom = prenom.substring(0, 14) + "...";
      
      let initiales = "";
    
      for (let i = 1; i < noms.length; i++) { // Parcourez les noms restants
        let nom = noms[i];
        if (nom.length > 0) { // Vérifiez si le nom n'est pas vide
          initiales += nom[0].toUpperCase() + ". "; // Ajouter l'initiale du nom
        }
      }
      return prenom + " " + initiales.toUpperCase(); // Combine le prénom et les initiales et renvoie le résultat
    } else {
      return texte.substring(0, 16) + "..."; // Si le nom ne contient pas d'espace prendre les 16 premiers caractères et ajouter des points de suspension
    }
  }
  return texte; // Renvoie le texte si il est déjà assez court
}


// Code à executer quand le document HTML est prêt
$(() => {
  //----------------------------localstorage----------------------------------------
  // Fonction déclenchée lorsqu'un élément du stockage local est modifié
  $(window).on("storage", event => {
    switch (event.originalEvent.key) {
      // Si l'élément modifié est "contacts", ajouter le nouveau contact
      case "contacts":
        const contact = JSON.parse(event.originalEvent.newValue);
        ajouterContactCarnet(contact);
      break;
    }
  });
  //----------------------------localstorage----------------------------------------

  //---------------------------popCourriel----------------------------
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
  //---------------------------popCourriel----------------------------

  //------------------------------Nouveau------------------------------
  // Ouvre le paneau des contacts quand on click sur la selection du destinataire
  $("#nouv-destinataire").focusin(() => {
    // Ouvre le paneau
    $(".container-nouv").css("grid-template-rows", "50% 40% 8%");
    $(".container-destinataires").removeClass("hidden");
    $(".nouv-info").css("grid-template-rows", "20% 60% 20%");
  }).focusout(() => {
      destinataireContract()
    });

  // Evite d'envoyer un courriel vide
  $("#nouv-destinataire, #nouv-sujet, #nouv-message").on("input", () => {
    if($("#nouv-destinataire").val()
    && $("#nouv-sujet").val()
    && $("#nouv-message").val()) {
      $(".nouv-btn-envoyer").removeClass("disabled");
    } else {
      $(".nouv-btn-envoyer").addClass("disabled");
    }
  });

  // Envoie le courriel 
  $(".nouv-btn-envoyer").on("click", () => {
    if($("#nouv-destinataire").val()
    && $("#nouv-sujet").val()
    && $("#nouv-message").val()) {
      sauvegarder("sentMessages", { 
        destinataire: $("#nouv-destinataire").val(), 
        objet: $("#nouv-sujet").val(), 
        message: $("#nouv-message").val() 
      });
      // Réinitialise les champs
      $("#nouv-destinataire").val("").trigger("input");
      $("#nouv-sujet").val("");
      $("#nouv-message").val("");
    }
  });
  //------------------------------Nouveau-------------------------------

  //------------------------------Contacts-------------------------------
  // Cette fonction vérifie si le champ texte de la pop-up de contact est rempli,
  // puis change le curseur selon le cas
  $(".pop-contact-cle textarea").on("input", () => {
    if($(".pop-contact-cle textarea").val()) {
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
  $(".btn-ajouter-contact").on("click" , () => {
    ouvrirPopup($("#pop-contact"));
    //sauvegarder le contact dans le localstorage lorsque le bouton est cliqué
    $("#pop-contact .pop-contact-btn").on("click", () => {
      if($(".pop-contact-cle textarea").val()) {
        sauvegarder("contacts", {
          nom: $(".pop-contact-nom input").val(),
          cle: $(".pop-contact-cle textarea").val()
        });
        $(".pop-contact-cle textarea").val("").trigger("input");
        $(".pop-contact-nom input").val("");
      }
    });
  })

  
  // affiche tous les contacts dans le localstorage
  if (chercherStore("contacts")) {
    let contacts = chercherStore("contacts").values;
    contacts.forEach(contact => ajouterContactCarnet(contact));
  }
 
  // Lorsqu'un utilisateur tape quelque chose dans le champ de recherche de contacts, filtre les contacts
  $(".recherche-contacts input").on("input", event => {
    // Récupère tous les contacts depuis le store 'contacts'
    const contacts = chercherStore("contacts").values;
    // Récupère la valeur actuelle du champ de recherche
    const input = $(event.currentTarget).val();
    // Si l'utilisateur a entré quelque chose dans le champ de recherche
    if (input) {
      // Filtre les contacts qui correspondent à la recherche
      // et les affiche
      const matchContacts = contacts.filter(contact => similaire(contact.cle, input) || similaire(contact.nom, input));
      matchContacts.forEach(contact => $("#" + contact.id).show());
      // Filtre les contacts qui ne correspondent pas à la recherche
      // et les cache
      const noMatchContacts = contacts.filter(contact => !(similaire(contact.cle, input) || similaire(contact.nom, input)));
      noMatchContacts.forEach(contact => $("#" + contact.id).hide());
    } else 
    // Si aucun texte n'est entré dans le champ de recherche, affiche tous les contacts
      $(".contacts-contact").show();
  })
  //------------------------------Contacts-------------------------------
});
