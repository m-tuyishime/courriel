# Interface web pour un système de messagerie (courriel)

Courriel est un système de messagerie pair-à-pair, c.-à-d., sans serveur centrale.

Le projet courriel est séparé en deux parties:

1. **Projet 1:** Interface web pour le courriel (code en **html**, **css** et **js**, à exécuter par un navigateur).

2. **Projet 2:** Un mini-serveur permettant le partage (distribution) des courriels (messages) entre plusieurs utilisateurs.

## Projet 1

Créer une page web (html) pour le courriel.

L'interface WEB devrait pouvoir:

1. Visualiser et rechercher la liste de messages
2. Composer un nouveau message.
3. Visualiser, rechercher et modifier le carnet d'adresses

Un message ne contient que du texte. Par exemple:

"Exemple d'un message\n ...\n voilà"

Une adresse (dans le carnet d'adresse) est une chaîne de caractères représentant une clé publique, par exemple

-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXPxCId4OAGDFmTqDZIJXAZnfp
xovsGt0Foqki3xymwxVvFqZWbG/8tJHB1sXUKZUHykOtgA6CNqehGIPjRbf1EVdF
hKREB5T2zWKpXFi7aJ3aF1c946gxiQYJofWOkWx/XpSEp6uwBNsznpFsreU0p6fs
gTxLHeAaZ7VQpySIpQIDAQAB
-----END PUBLIC KEY-----

Dans le cadre du projet 1, vous allez rendre la liste de messages et le carnet d'adresses persistants, en utilisant **localStorage**.

Chaque groupe (de 1 à 5 personnes) devrait produire:

- un document courriel.html accompagné par des documents
- \*.css et
- \*.js.

## Évaluation

    1.Qualité et présentation du document html : 40%
    2.Qualité et présentation du document css : 30%
    3.Qualité, présentation et structure du code java-script : 30%
