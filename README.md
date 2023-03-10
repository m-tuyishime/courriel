# Courriel - Interface Web pour un Système de Messagerie

Courriel est un système de messagerie pair-à-pair, c'est-à-dire sans serveur central. 
Ce projet se compose de deux parties : 
une interface web pour le courriel et un mini-serveur permettant le partage (distribution) des courriels (messages) entre plusieurs utilisateurs.

## Installation
L'interface web est accessible à l'URL suivante : **https://m-tuyishime.github.io/courriel/**

## Fonctionnalités
L'interface web permet de :

1. Visualiser et rechercher la liste de messages
2. Composer un nouveau message.
3. Visualiser, rechercher et modifier le carnet d'adresses

Un message ne contient que du texte et une adresse (dans le carnet d'adresse) est une chaîne de caractères représentant une clé publique.

-----BEGIN PUBLIC KEY-----<br>
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXPxCId4OAGDFmTqDZIJXAZnfp
xovsGt0Foqki3xymwxVvFqZWbG/8tJHB1sXUKZUHykOtgA6CNqehGIPjRbf1EVdF
hKREB5T2zWKpXFi7aJ3aF1c946gxiQYJofWOkWx/XpSEp6uwBNsznpFsreU0p6fs
gTxLHeAaZ7VQpySIpQIDAQAB<br>
-----END PUBLIC KEY-----

La liste de messages et le carnet d'adresses sont persistants grâce à l'utilisation de **localStorage**.

## Structure du Projet
Ce projet se compose de deux parties :

## Projet 1
Le projet 1 est l'interface web pour le courriel. Chaque groupe (de 1 à 5 personnes) doit produire :

- un document **"courriel.html"** accompagné des documents **"\*.css"** et **"\*.js.""**

## Projet 2
Le projet 2 est le mini-serveur permettant le partage des courriels entre plusieurs utilisateurs.

## Évaluation
L'évaluation se fera selon les critères suivants :

1. Qualité et présentation du document HTML : 40%
2. Qualité et présentation du document CSS : 30%
3. Qualité, présentation et structure du code JavaScript : 30%