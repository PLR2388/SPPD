# SPPD

:warning: **Ce code est incomplet et il manque une partie pour être fonctionnel !**

Il s'agit d'un projet permettant de mettre à jour sa liste de cartes que nous avons dans le jeu South Park: Phone Destroyer™ (SPPD) via une interface web pour que le système puisse proposer à l'utilisateur des decks efficaces selon les cartes dont il dispose. 
(Plus d'informations sur le jeu : https://www.ubisoft.com/fr-fr/game/south-park/phone-destroyer)


Actuellement, il permet de calculer le deck ayant la meilleur santé, la meilleur attaque ou le plus économe en mana.
Un autre critère, qui est en développement, est de proposer la meilleur équipe possible connaissant le niveau du joueur et en récupérant des données statistiques des meilleurs équipes.

## Installation

Ce projet fonctionne avec NodeJs. Ainsi, je vous invite à installer NodeJs sur votre machine si ce n'est pas déjà fait : https://nodejs.org

Après avoir cloner le projet, n'oubliez pas de lancer `npm install` dans le dossier du projet pour installer toutes les dépendances.

Pour lancer le serveur Node, allez dans le dossier bin et utiliser la commande `node www`. Le projet sera alors accessible via l'adresse : http://localhost:3000

## Fonctionnement

Il faut d'abord enregistrer les cartes que vous avez avec le niveau associé. Dès que cela est fait, vous pouvez utilisez la seconde partie pour que le système vous propose des decks. 
