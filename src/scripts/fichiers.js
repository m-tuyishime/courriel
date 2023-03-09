// Tableau d'URL de fichiers de style
const stylesChemin = "./styles/";
const styleUrls = [
  "index.css",
  "reutilisables.css",
  "composantes/navbar.css",
  "composantes/nouvCourriel.css",
  "composantes/Contacts/carnetContacts.css",
  "composantes/Contacts/popupContacts.css",
  "composantes/Courriels/listeCourriels.css",
  "composantes/Courriels/popupCourriels.css"
].map(nom => stylesChemin + nom);

// Chargez chaque fichier de style et ajoutez une balise de lien à l'élément head
styleUrls.forEach(url => {
  const link = document.createElement('link');
  link.rel = "stylesheet",
    link.type = "text/css";
  link.href = url;
  $("head").append(link);
});

// Tableau d'URL de fichiers de script
const scriptsChemin = "./scripts/";
const scriptUrls = [
  "stockage.js",
  "reutilisables.js",
  "composantes/navbar.js",
  "composantes/Contacts/carnetContacts.js",
  "composantes/Contacts/fonctions.js",
  "composantes/Contacts/popupContacts.js",
  "composantes/Courriels/fonctions.js",
  "composantes/Courriels/listeCourriels.js",
  "composantes/Courriels/popupCourriels.js",
  "composantes/NouvCourriel/fonctions.js",
  "composantes/NouvCourriel/nouveauCourriel.js"
].map(nom => scriptsChemin + nom);

// Chargez chaque fichier de script et ajoutez une balise de script à l'élément head
scriptUrls.forEach(url => {
  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = url;
  $("head").append(script);
});




