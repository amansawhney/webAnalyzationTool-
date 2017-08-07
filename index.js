const express = require('express');
const app = express();

//middleWare
require('./middleware')(app);

//routes
require('./routes')(app);


app.get('/', (req, res) => {
  res.send("This is an API not an app, don't try and get me!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
