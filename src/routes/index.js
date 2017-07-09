// src/routes/index.js

const router = require('express').Router();

const FILES = [
  {id: 'a', title: 'Between the leaves and in the bed', artist: 'Ebony G. Patterson', icon: 'patterson', year: '2015', media: 'Photo, paper and embellishments', category: 'Contemporary Art, 1980-Present', museum: 'KMAC'},
  {id: 'b', title: 'Totally in Love', artist: 'Pieke Bergmans', icon: 'bergmans', year: '2012', media: 'Steel, hand-blown glass, electronics', category: 'Contemporary Art, 1980-Present', museum: '21c Lexington'},
  {id: 'c', title: 'Waiting (L’Attente)', artist: 'Marc Chagall', icon: 'chagall', year: '1967', media: 'Oil on canvas', category: 'European and American Art, 1945-1980', museum: 'Speed Art Museum'},
  {id: 'd', title: 'Priscilla Johnston', artist: 'Alice Neel', icon: 'neel', year: '1966', media: 'Oil on canvas', category: 'European and American Art, 1945-1980', museum: 'Speed Art Museum'},
  {id: 'e', title: 'Portrait of Madame Adélaïde', artist: 'Adélaïde Labille‑Guiard', icon: 'labille‑guiard', year: 'c 1787', media: 'Oil on canvas', category: 'European Art, 1700-1800', museum: 'Speed Art Museum'},
  {id: 'f', title: 'David (inspired by Michelangelo)', artist: 'Serkan Özkaya', icon: 'ozkaya', year: '2005', media: 'Steel, fiberglass, paint', category: 'Contemporary Art, 1980-Present', museum: '21c Louisville'},
  {id: 'g', title: 'Portrait of Mademoiselle Duclos in the Role of Ariadne', artist: 'Nicolas de Largillière', icon: 'largilliere', year: 'c 1712', media: 'Oil on canvas', category: 'European Art, 1700-1800', museum: 'Speed Art Museum'},
];

router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

router.get('/file', function(req, res, next) {
  res.json(FILES);
});

router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});

router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.artist = req.body.artist;
  res.json(file);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});


module.exports = router;