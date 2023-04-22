// Description: Ce fichier contient l'exécution du serveur

// Importe les modules nécessaires
const express = require('express');
const path = require('path');

// Crée une instance d'express
const app = express();

// Définit le port du serveur
const port = 3000;

// Définit le dossier public comme dossier statique
app.use(express.static(path.join(__dirname, '..', 'public')));

// Définit la route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// lance le serveur sur le port 3000
const serveur = app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});


module.exports = {
    app, serveur
}
