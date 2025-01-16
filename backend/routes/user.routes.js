const express = require('express');
const upload = require('../middleware/uploads/multer.js');
const {
  CreateUSer,
  verifyUserController,
  signup,
  login,
} = require('../controller/user.controller.js');

const router = express.Router();

router.post('/create-user', upload.single('file'), CreateUSer);
router.get('/activation/:token', verifyUserController);

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;