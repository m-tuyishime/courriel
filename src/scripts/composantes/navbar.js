// Longueur d'une cle d'addresse
const longueurCle = 216;

// Générer une clé similaire au modèle donné
const generateCle = () => {
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const caracteresUtilises = abc + abc.toUpperCase() + "0123456789" + "+/=";
    let cle = "";
    for (let i = 0; i < longueurCle; i++) {
        cle += caracteresUtilises.charAt(Math.floor(Math.random() * caracteresUtilises.length));
    }
    return cle;
}

// Verifie si la clé est déjà dans le localstorage
let cleUtilisateur = localStorage.getItem("cleUtilisateur");
if (!cleUtilisateur) {
    // Genere une nouvelle clé sinon et la sauvegarde
    cleUtilisateur = generateCle();
    localStorage.setItem("cleUtilisateur", cleUtilisateur);
}

// Formatte la cle en sottant des lignes tous les 64 chars
const formatteCle = cle => {
    let nouvCle = "";
    nouvCle += cle.substring(0, 64) + "\n";
    nouvCle += cle.substring(64, 128) + "\n";
    nouvCle += cle.substring(128, 192) + "\n";
    nouvCle += cle.substring(192);
    return nouvCle;
}

// Insère la clé dans le DOM
$(() => $(".adresse").text(formatteCle(cleUtilisateur)))