fetch("dovecotApiClients.php")
.then(response => response.json())
.then(posts => {
  let ul = document.createElement('ul'); // Création d'un élément HTML "ul"

  // Boucles sur les données
  posts.forEach(post => {
    ul.innerText = `<li>${post.title}</li>`; // Création d'une "li" avec concaténation des données reçues
  });

  document.querySelector('body').append(ul); // Ajoute la liste dans le body du document
})
.catch(error => alert("Erreur : " + error));