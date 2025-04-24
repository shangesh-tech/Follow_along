const multer = require('multer');
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "uploads");
const productsDir = path.join(__dirname, "products");
[uploadsDir, productsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);
      cb(null, `${filename}-${uniqueSuffix}${ext}`);
  },
});


const pstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productsDir);
  },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);
      cb(null, `${filename}-${uniqueSuffix}${ext}`);
    },  
  });


  exports.upload = multer({ storage: storage });
  exports.pupload = multer({ storage: pstorage });