const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
//Turn on routes
app.use(routes);

//turn on connection to the database
//"sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
//If it doesn't find a table, it'll create it for you!
//force: true, it would drop and re-create all of the database tables on startup.
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('Now istening'));
})