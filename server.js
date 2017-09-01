const express = require('express');
const parser = require('body-parser');
const app = express();

app.use('/', express.static('./src'));

app.use(parser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});
