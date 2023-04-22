// Test les routes du serveur dans serveur\serveur.js :
// le serveur doit etre fermé lorsqu'on fait ces tests

const request = require('supertest');
const { app, serveur } = require('../serveur');

// Testez si le serveur se lance correctement sur le port 3000 
test('Le serveur doit se lancer sur le port 3000', (done) => {
    request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            serveur.close();
            done();
        });
});

// Testez si la page d'accueil s'affiche correctement
test('La page d\'accueil doit s\'afficher correctement', (done) => {
    request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .then((response) => {
            expect(response.text).toContain('<title>Courriel</title>');
            expect(response.text).toContain('<h1>Courriel</h1>');
            serveur.close();
            done();
        })
        .catch((err) => done(err));
});

// Testez si le dossier public est correctement défini comme dossier statique
test('Le dossier public doit être défini comme dossier statique', (done) => {
    request(app)
        .get('/scripts/fichiers.js')
        .expect('Content-Type', /javascript/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            serveur.close();
            done();
        });
});
