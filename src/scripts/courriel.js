const supprimerCourriel = (id) => {};
const sauvegarder = (key, message) => {
  let messages = chercher(key) ?? [];
  messages.push(message);
  messages = JSON.stringify(messages);
  localStorage.setItem(key, messages);
  
  const event = new StorageEvent("storage", {
    key,
    newValue: messages
  });
  window.dispatchEvent(event);
};

const chercher = key => JSON.parse(localStorage.getItem(key));

const destinataireContract = () => {
  $(".container-nouv").css("grid-template-rows", "20% 70% 8%");
  $(".container-destinataires").addClass("hidden");
  $(".nouv-info").css("grid-template-rows", "50% 50%");
}

const ajouterContact = contact => {
  const $composante = $("#contacts-contact").clone();
  $composante.removeClass("hidden");
  if (contact.nom) 
    $composante.find(".contacts-user").text(contact.nom);
  else {
    $composante.find(".logo-utilisateur").attr("src", "./images/cle.svg");
    $composante.find(".contacts-user").text(raccourcirCle(contact.cle));
  }

  $(".list-contacts").append($composante);
}

/* raccourcir la longueur de la cle d'indentification pour prendre les 12 premiers lettre
et les 7 derniers */
const raccourcirCle = cle => cle.substring(0, 12) + "..." + cle.substring(cle.length - 7);

$(() => {
  $(window).on("storage", event => {
    switch (event.originalEvent.key) {
      case "contacts":
        const contacts = chercher("contacts");
        const contact = contacts[contacts.length -1];
        ajouterContact(contact);
      break;
    }
  });

  //---------------------------popCourriel----------------------------
  // ouvrir le popup
  $(".courriel").on("click", () => {
    $(".background-fade").removeClass("hidden");
    $(".pop-courriel").removeClass("hidden");
  });
  // fermer le popup
  $(".pop-fermer").on("click", () => {
    $(".background-fade").addClass("hidden");
    $(".popup").addClass("hidden");
  });
  $(".pop-poubelle").on("click", () => {
    // supprimer le courriel
    alert("are you sure?");
    $(".background-fade").addClass("hidden");
    $(".pop-courriel").addClass("hidden");
    supprimerCourriel();
  });
  //---------------------------popCourriel----------------------------

  //------------------------------Nouveau------------------------------
  //permet de choisir le destinataire
  let isDestinataireExpand = false;
  $(".container-nouv-destinataire").on("click", event => {
    if (isDestinataireExpand) {
      isDestinataireExpand = false;
      destinataireContract()
      $(event.currentTarget).on("change", () => {
        let entree = $("#nouv-destinataire").val();
        // sort
      })
    } else {
      isDestinataireExpand = true;
        $(".container-nouv").css("grid-template-rows", "50% 40% 8%");
        $(".container-destinataires").removeClass("hidden");
        $(".nouv-info").css("grid-template-rows", "20% 60% 20%");
    }
  });
  $(".container-nouv-objet, .nouv-message").on("click", () => {
    isDestinataireExpand = false;
    destinataireContract()
  })

  //evite d'envoyer un courriel vide
  $("#nouv-destinataire, #nouv-sujet, #nouv-message").on("input", () => {
    if($("#nouv-destinataire").val()
    && $("#nouv-sujet").val()
    && $("#nouv-message").val()) {
      $(".nouv-btn-envoyer").removeClass("disabled");
    } else {
      $(".nouv-btn-envoyer").addClass("disabled");
    }
  });

  //envoie le courriel 
  $(".nouv-btn-envoyer").on("click", () => {
    if($("#nouv-destinataire").val()
    && $("#nouv-sujet").val()
    && $("#nouv-message").val()) {
      sauvegarder("sentMessages", { 
        destinataire: $("#nouv-destinataire").val(), 
        objet: $("#nouv-sujet").val(), 
        message: $("#nouv-message").val() 
      });
      $("#nouv-destinataire").val("").trigger("input");
      $("#nouv-sujet").val("");
      $("#nouv-message").val("");
    }
  });
  //------------------------------Nouveau-------------------------------

  //------------------------------Contacts-------------------------------
  //ouvrir le popup des contacts
  $(".btn-ajouter-contact").on("click" , () => {
    $(".background-fade").removeClass("hidden");
    $(".pop-ajouter").removeClass("hidden");
  })

  $(".pop-ajouter-cle textarea").on("input", event => {
    if($(".pop-ajouter-cle textarea").val()) {
      $(".pop-ajouter-btn div").addClass("clickable");
      $(".pop-ajouter-btn").on("mouseover", event => $(event.currentTarget).css("cursor", "pointer"));
    } else {
      $(".pop-ajouter-btn div").removeClass("clickable");
      $(".pop-ajouter-btn").on("mouseover", event => $(event.currentTarget).css("cursor", "default"));
    }
  })

  //sauvegarder le contact dans le localstorage
  $(".pop-ajouter-btn").on("click", () => {
    if($(".pop-ajouter-cle textarea").val()) {
      sauvegarder("contacts", {
        nom: $(".pop-ajouter-nom input").val(),
        cle: $(".pop-ajouter-cle textarea").val()
      });
      $(".pop-ajouter-cle textarea").val("").trigger("input");
      $(".pop-ajouter-nom input").val("");
    }
  });
  //------------------------------Contacts-------------------------------
});
