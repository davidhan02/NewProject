const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const googleRoutes = require('./routes/auth/googleRoutes');
const authRoutes = require('./routes/api/userRoutes');
const profileRoutes = require('./routes/api/profileRoutes');
const postRoutes = require('./routes/api/postRoutes');

require('./services/passportSetup')(passport);
require('./services/passportLocal')(passport);
require('./services/passportGoogle')(passport);

const keys = require('./config/keys');

const app = express();

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.secretKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', googleRoutes);
app.use('/api/users', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${port}`)
);
