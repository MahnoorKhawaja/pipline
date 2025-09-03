var express = require('express');
var multer = require('multer');
var fs = require('fs');

var app = express();
app.set('view engine', 'ejs');

// Serve index page
app.get('/', (req, res) => {
    res.render('index');
});

// Multer storage configuration
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).array('files', 12);

// File upload route
app.post('/upload', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Something went wrong!");
        }
        res.send("Upload completeddd.");
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});