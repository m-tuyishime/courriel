const delCourriel = (id) => {};
const sendCourriel = (message) => {
  const key = "sentMessages";
  let sentMessages = localStorage.getItem(key) ?? [];
  sentMessages.push(message);
  sentMessages = JSON.stringify(sentMessages);
  localStorage.setItem(key, sentMessages);
};

const destinataireContract = () => {
  $(".container-nouv").css("grid-template-rows", "20% 70% 8%");
  $(".container-destinataires").addClass("hidden");
  $(".nouv-info").css("grid-template-rows", "50% 50%");
}

$(() => {
  //---------------------------popCourriel----------------------------
  // ouvrir le popup
  $(".courriel").on("click", () => {
    $(".background-fade").show();
    $(".pop-courriel").show();
  });
  // fermer le popup
  $(".pop-fermer").on("click", () => {
    $(".background-fade").hide();
    $(".pop-courriel").hide();
  });
  $(".pop-poubelle").on("click", () => {
    // supprimer le courriel
    alert("are you sure?");
    $(".background-fade").hide();
    $(".pop-courriel").hide();
    delCourriel();
  });
  //---------------------------popCourriel----------------------------

  //------------------------------Nouveau-------------------------------
  $(".nouv-btn-envoyer").on("click", () => {
    const destinataire = $("#nouv-destinataire").val();
    const objet = $("#nouv-sujet").val();
    const message = $("#nouv-message").val();
    sendCourriel({ destinataire, objet, message });
    $("#nouv-destinataire").val("");
    $("#nouv-sujet").val("");
    $("#nouv-message").val("");
  });

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

  //------------------------------Nouveau-------------------------------
});
