// Supprime un objet dans le localstorage 
const supprimer = (key, value) => {
  // Cherche le store avec la clé passée en paramètre et si celui-ci est null ou undefined, crée un nouveau store
  let store = chercherStore(key);
  // Recherche l'index de l'objet dans le store grâce à son id
  const indexToRemove = store.valeurs.findIndex(obj => obj.id === value.id);
  // Enleve l'objet de son tableau
  store.valeurs.splice(indexToRemove, 1);
  // Sauvegarde le nouveau store sans l'objet dans le localstorage
  store = JSON.stringify(store);
  localStorage.setItem(key, store);
};

// Sauvegarde un objet dans le localstorage 
const sauvegarder = (key, value) => {
  // Cherche le store avec la clé passée en paramètre et si celui-ci est null ou undefined, crée un nouveau store 
  let store = chercherStore(key) ?? {
    valeurs: [],
    inserations: 0
  };
  // Si l'objet à sauvegarder ne possède pas d'id, on lui en ajoute un en utilisant la variable inserations du store
  if (value.id === undefined) {
    value.id = `${key}-${store.inserations}`;
    store.inserations++;
  }
  // Recherche l'index de l'objet dans le store grâce à son id
  const index = store.valeurs.findIndex(obj => obj.id === value.id);
  // Si l'objet est déjà présent dans le store, on le met à jour
  if (index != -1)
    store.valeurs[index] = value;
  else {
    store.valeurs.push(value);
  }
  // On transforme le store en chaîne de caractères JSON pour pouvoir le stocker dans le localstorage
  store = JSON.stringify(store);
  localStorage.setItem(key, store);

  // On crée un événement de stockage avec la clé et la valeur sauvegardées
  const event = new StorageEvent("storage", {
    key,
    newValue: JSON.stringify(value),
  });
  window.dispatchEvent(event);
};

// Cherche un store dans le localstorage avec la clé passée en paramètre et le renvoie sous forme d'objet
const chercherStore = key => JSON.parse(localStorage.getItem(key));

// Met a jour le document html quand il y a un changement dans le localstorage
$(() => {
  // Fonction déclenchée lorsqu'un élément du stockage local est modifié
  $(window).on("storage", event => {
    switch (event.originalEvent.key) {
      // Si l'élément modifié est un des contacts, ajouter le nouveau contact
      case "contacts":
        const contact = JSON.parse(event.originalEvent.newValue);
        ajouterContactCarnet(contact);
        break;
    }
  });
})