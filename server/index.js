
// server/index.js

// const express = require("express");

// const PORT = process.env.PORT || 3000;

// const app = express();

// const path = require('path');


// // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// // All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

// app.use('/static', express.static(path.join(__dirname, '../client/build//static')));
// app.get('*', function(req, res) {
//   res.sendFile('index.html', {root: path.join(__dirname, '../client/public/')});
// });

// app.get('/*', (req, res) => {
  // const context = {};
  // const app = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.url} context={context}>
  //     <App />
  //   </StaticRouter>
  // );

  // const indexFile = path.resolve('./build/index.html');
  // fs.readFile(indexFile, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Something went wrong:', err);
  //     return res.status(500).send('Oops, better luck next time!');
  //   }

  //   return res.send(
  //     data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  //   );
  // });
// });

/* GET React App */
// router.get(['/client', '/client/*'], function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../public', 'app.html'));
//  });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../client', 'public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
   console.log('Server is up!');
});