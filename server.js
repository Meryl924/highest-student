const fs = require('fs'); // Importer le module pour gérer les fichiers
const express = require('express'); // Importer Express
const app = express(); // Créer une application Express
const port = 3000; // Définir le port du serveur

// Définir une route GET sur la racine
app.get('/', (req, res) => {
  res.send('Hello World!');
});
  app.get('/api/etudiants', (req, res) => {
    fs.readFile('etudiants.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        const etudiants = JSON.parse(data);
        res.json(etudiants);
      }
    });
  });
  
  

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
