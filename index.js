const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v1())
    }
})

const upload = multer({ storage });

app.use('/', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        next(error);
    }
})

app.use('/convert', upload.array('files'), (req, res, next) => {
    const files = req.files;
    console.log(files);
    res.status(200).json({ok: true});
})

app.use((error, req, res, next) => {
    res.status(400).json({
        code: 400,
        status: 'System error',
        message: 'An error occurred on the system, please contact us to fix it'
    })
})

app.listen(3000);