const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // Pour analyser les données JSON
app.get('/api/films', (req, res) => {
    fs.readFile('films.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        const films = JSON.parse(data);
        res.json(films);
      }
    });
  });
  app.get('/api/films/:id', (req, res) => {
    fs.readFile('films.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        const films = JSON.parse(data);
        const film = films.find(f => f.id === parseInt(req.params.id));
        if (film) {
          res.json(film);
        } else {
          res.status(404).send('Film non trouvé');
        }
      }
    });
  });
  app.post('/api/films', (req, res) => {
    fs.readFile('films.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
      } else {
        const films = JSON.parse(data);
        const nouveauFilm = {
          id: films.length + 1,
          titre: req.body.titre,
          realisateur: req.body.realisateur,
        };
        films.push(nouveauFilm);
        fs.writeFile('films.json', JSON.stringify(films, null, 2), err => {
          if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
          } else {
            res.status(201).json(nouveauFilm);
          }
        });
      }
    });
  });
      

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
