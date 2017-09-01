const express = require('express');
const app = express();

app.use(express.static('src'));

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});
