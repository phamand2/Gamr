const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const es6Renderer = require('express-es6-template-engine')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models')
const store = new SequelizeStore({ db: db.sequelize })


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret', // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: true, // always create a session
    store: store,
  })
  );
  store.sync()

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games',gamesRouter)


module.exports = app;
