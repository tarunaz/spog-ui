const  express = require('express');
const es6Renderer = require('express-es6-template-engine');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.engine('html', es6Renderer);
app.set('views', path.join(__dirname, 'angular/dist'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['js', 'svg', 'css', 'png'],
  index: false
}
app.use(express.static(path.join(__dirname, 'angular/dist'), options))

app.get('*', (req, res) => {
  res.render('index', {locals: {apiBase: process.env.API_BASE}});
});

/*app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'angular/dist/index.html'));
  res.render('index', {locals: {apiBase: process.env.API_BASE}});
});
*/
const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`Express serving angular running on localhost:${port}`));