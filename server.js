const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Turn on routes
app.use(routes);

//turn on connection to the database
//"sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
//If it doesn't find a table, it'll create it for you!
//force: true, it would drop and re-create all of the database tables on startup.
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('Now istening'));
})