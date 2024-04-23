var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }

  // Retrieve file details
  const { originalname, mimetype, size } = req.file;

  // Send JSON response with file details
  res.json({
      name: originalname,
      type: mimetype,
      size: size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});