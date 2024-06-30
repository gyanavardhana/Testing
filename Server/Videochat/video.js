const express = require('express');
const { v4: uuidV4 } = require('uuid');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(uuidV4(),'mac');
  res.json({ roomId: uuidV4() });
});

router.get('/room/:room', (req, res) => {
  console.log("hi");
  res.json({ roomId: req.params.room }); // Adjust the response as needed for your React component
});

module.exports = router;
