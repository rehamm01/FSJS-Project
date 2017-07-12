// src/routes/index.js

const mongoose = require('mongoose');
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
  mongoose.model('File').find({}, function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }

    res.json(files);
  });
});


router.get('/file', function(req, res, next) {

  const deleted = (req.query.deleted === 'Y') ? true : {$ne: true};
  const term = req.query.q || null;
  const query = {
    deleted: deleted,
  };

  if (term) {
    query.$or = [
      { title: new RegExp(term, 'ig'), },
      { artist: new RegExp(term, 'ig'), },
      { icon: new RegExp(term, 'ig'), },
      { year: new RegExp(term, 'ig'), },
      { media: new RegExp(term, 'ig'), },
      { category: new RegExp(term, 'ig'), },
      { museum: new RegExp(term, 'ig'), },
    ];
  }

  mongoose.model('File').find(query, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(files);
  });
});


// router.get('/file', function(req, res, next) {
//   mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
//     if (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }

//     res.json(files);
//   });
// });


router.post('/file', function(req, res, next) {
  const File = mongoose.model('File');
  const fileData = {
    title: req.body.title,
    artist: req.body.artist,
    icon: req.body.icon,
    year: req.body.year,
    media: req.body.media,
    category: req.body.category,
    museum: req.body.museum,
  };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});

router.put('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  if(File && File._fileId !== fileId) {
    return res.status(500).json({err: "Ids don't match!"})
  }
  File.findByIdAndUpdate(fileId, File, {new: true}, function(err, File) {
    if(err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'File': File, message: 'File updated.'});
  })
}); 


// router.put('/file/:fileId', function(req, res, next) {
// const File = mongoose.model('File');
// const fileId = req.params.fileId;

//   File.findById(fileId, function(err, file) {
//     if (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//     if (!file) {
//       return res.status(404).json({message: "File not found"});
//     }

//     file.title = req.body.title;
//     file.artist = req.body.artist;
//     file.icon = req.body.icon;
//     file.year = req.body.year;
//     file.media = req.body.media;
//     file.category = req.body.category;
//     file.museum = req.body.museum;

//     file.save(function(err, savedFile) {
//       res.json(savedFile);
//     })

//   })
// });



router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.deleted = true;

    file.save(function(err, doomedFile) {
      res.json(doomedFile);
    })

  })
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