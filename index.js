const express = require('express');
const app = express();

//middleWare
require('./middleware')(app);

//routes
require('./routes')(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send({failed: true});
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (res, req) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT);
