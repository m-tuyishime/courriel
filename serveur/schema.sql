-- Description: Le schéma de la base de données

-- Création de la base de données
CREATE DATABASE IF NOT EXIST courriel;

-- Connexion à la base de données
\c courriel

-- Les tables de la base de données

CREATE TABLE IF NOT EXIST contacts (
    pk INTEGER PRIMARY KEY,
    nom TEXT NOT NULL,
);

CREATE TABLE IF NOT EXIST courriels (
    pk INTEGER PRIMARY KEY,
    expediteur INTEGER REFERENCES contacts(pk) ON DELETE CASCADE,
    destinataire INTEGER REFERENCES contacts(pk) ON DELETE CASCADE,
    sujet TEXT NOT NULL,
    corps TEXT NOT NULL,
);

CREATE TABLE IF NOT EXIST utilisateur (
    pk INTEGER PRIMARY KEY,
    sk INTEGER UNIQUE NOT NULL,
    nom TEXT UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
);