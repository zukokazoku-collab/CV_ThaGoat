# Guide des Fonctions JavaScript pour votre CV Interactif

Ce guide décrit l'architecture JavaScript recommandée pour votre projet. Il contient les signatures de fonctions, les explications de leurs rôles, leurs paramètres et des exemples d'utilisation. Vous devez écrire le corps de ces fonctions selon vos besoins.

---

## 1. Gestion du Mode (Professionnel / Personnel)

Pour basculer entre le profil professionnel (thème sombre/noir) et le profil personnel (thème bleu/océan) et adapter le contenu, nous vous suggérons de découper la logique en trois fonctions.

### `toggleProfileMode`
* **Description** : Cette fonction sert de point d'entrée lors du clic sur le bouton de basculement. Elle change l'état global du site (par exemple, en inversant une variable booléenne ou en lisant l'état actuel) et appelle les fonctions de mise à jour visuelle.
* **Paramètres** : Aucun.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  // À attacher sur l'événement 'click' de votre bouton de basculement
  buttonToggle.addEventListener('click', toggleProfileMode);
  ```

### `applyTheme`
* **Description** : Modifie l'apparence visuelle globale du site (les couleurs, arrière-plans, variables CSS de `:root` ou classes du `body`) selon le mode choisi.
* **Paramètres** :
  * `isProfessional` (*Boolean*) : `true` si le mode professionnel doit être appliqué, `false` pour le mode personnel.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  // Appliquer le thème bleu/océan (personnel)
  applyTheme(false);
  ```

### `toggleContentVisibility`
* **Description** : Masque les sections professionnelles (expériences, formations) et affiche à la place les sections personnelles (passions, détails lecture/musique), ou inversement.
* **Paramètres** :
  * `isProfessional` (*Boolean*) : `true` pour afficher le CV pro, `false` pour afficher le CV perso.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  // Masquer le pro et afficher les passions perso
  toggleContentVisibility(false);
  ```

---

## 2. Animations au Survol (Hover) et Manipulation CSS

Pour manipuler le CSS en JavaScript comme demandé et animer vos éléments.

### `initializeHoverAnimations`
* **Description** : Sélectionne toutes vos cartes (sections) et attache des écouteurs d'événements pour créer un effet d'élévation dynamique (effet 3D/shadow) lorsque la souris entre et sort de la carte.
* **Paramètres** : Aucun.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  // À appeler une fois au chargement de la page
  initializeHoverAnimations();
  ```

### `handleCardHover`
* **Description** : Modifie directement les propriétés CSS d'un élément (comme `transform` et `boxShadow`) pour lui donner un effet d'élévation.
* **Paramètres** :
  * `element` (*HTMLElement*) : L'élément HTML à animer.
  * `isHovered` (*Boolean*) : `true` si la souris survole l'élément (élévation), `false` si elle le quitte (retour à l'état initial).
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  // Dans un écouteur d'événement
  handleCardHover(cardElement, true);
  ```

### `initializeProfilePicHover`
* **Description** : Gère le changement de la photo de profil lors du survol. Elle doit changer la source de l'image (ou le background) selon que la souris est sur la photo ou non.
* **Paramètres** :
  * `profilePicElement` (*HTMLElement*) : L'élément HTML représentant la photo de profil.
  * `normalPicUrl` (*String*) : URL de la photo professionnelle.
  * `funPicUrl` (*String*) : URL de la photo personnelle/fun.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  const photoDiv = document.querySelector('.photo');
  initializeProfilePicHover(photoDiv, '../images/photo-pro.jpg', '../images/photo-perso.jpg');
  ```

---

## 3. Gestion des Easter Eggs et Fenêtres Surgissantes (Modales)

Pour afficher les livres lus avec leurs résumés et les productions musicales sous forme de galerie ou de popup interactif.

### `initializeEasterEggs`
* **Description** : Attache des écouteurs d'événements sur les mots clés spécifiques (comme "lecture" ou "production musicale") pour déclencher l'ouverture de la modale avec le bon contenu.
* **Paramètres** : Aucun.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  // À appeler au chargement de la page
  initializeEasterEggs();
  ```

### `openModal`
* **Description** : Rend visible la fenêtre modale à l'écran en modifiant son style d'affichage (ex: de `display: none` à `display: block` ou en lui ajoutant une classe active) et y injecte le contenu approprié.
* **Paramètres** :
  * `modalElement` (*HTMLElement*) : L'élément HTML servant de conteneur à la modale.
  * `contentHtml` (*String*) : Le code HTML du contenu à insérer dans la modale (généré dynamiquement).
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  const myModal = document.getElementById('easter-egg-modal');
  const booksListHtml = '<p>Résumé de mes livres...</p>';
  openModal(myModal, booksListHtml);
  ```

### `closeModal`
* **Description** : Ferme la fenêtre modale (par exemple en cliquant sur un bouton "Fermer" ou à l'extérieur de la fenêtre).
* **Paramètres** :
  * `modalElement` (*HTMLElement*) : L'élément HTML de la modale à masquer.
* **Retour** : Aucun.
* **Exemple d'utilisation** :
  ```javascript
  closeModal(myModal);
  ```

### `generateEasterEggContent`
* **Description** : Renvoie le code HTML structuré correspondant à l'Easter Egg demandé (soit la liste des livres lus avec leurs résumés, soit la galerie de productions musicales).
* **Paramètres** :
  * `type` (*String*) : Le type de contenu à générer (ex: `'lecture'` ou `'musique'`).
* **Retour** : *String* (le bloc HTML à insérer).
* **Exemple d'utilisation** :
  ```javascript
  const htmlContent = generateEasterEggContent('lecture');
  ```
