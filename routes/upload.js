var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

/* GET users listing. */
router.post('/', upload.fields([ { name: 'thumbnail' } ]), function(req, res, next) {
  var path = req.files.thumbnail[0].path;
  var filename = req.files.thumbnail[0].filename;
  var originalname = req.files.thumbnail[0].originalname;
  var targetPath = './uploads/' + originalname;
  
  console.log(path, filename, originalname);

  fs.rename(path, targetPath, function(err) {
    if (err) {
      throw err;
    }
    fs.unlink(path, function() {
      if (err) {
        throw err;
      }
      res.send('File uploaded to: ' + targetPath + ' - ' + req.files.thumbnail[0].size + ' bytes');
    });
  });
});

module.exports = router;
