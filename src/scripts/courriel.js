const delCourriel = (id) => {};
const sendCourriel = (message) => {
  const key = "sentMessages";
  let sentMessages = localStorage.getItem(key) ?? [];
  sentMessages.push(message);
  sentMessages = JSON.stringify(sentMessages);
  localStorage.setItem(key, sentMessages);
};

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
  //------------------------------Nouveau-------------------------------
});
