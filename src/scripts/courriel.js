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
    // delete stuff
    alert("are you sure?");
    $(".background-fade").hide();
    $(".pop-courriel").hide();
  });
  //---------------------------popCourriel----------------------------
});
