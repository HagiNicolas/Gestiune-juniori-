import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import basicAuth from 'express-basic-auth';

const app = express();
const port = 3000;


app.set('view engine', 'ejs');

// Autentificare de bază
const users = { username: 'password' }; // Definește perechi de nume de utilizator și parole aici

// Funcție pentru verificarea autentificării
const auth = basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized access!',
});


app.use(auth);


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

// Conectare la baza de date MongoDB
mongoose.connect('MongoDB DataBase CONNECTION', { useNewUrlParser: true });

// Definește un schema pentru camere
const roomSchema = new mongoose.Schema({
  NumarCamera: Number,
  players: [String],
});

// Definește un model pentru camere
const Room = mongoose.model('Room', roomSchema);

// Rută pentru pagina principală
app.get('/', (req, res) => {
  Room.find({})
    .then((rooms) => {
      res.render('index', { rooms });
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Rută pentru trimiterea datelor
app.post('/submit', (req, res) => {
  const jucator1 = req.body['juc1'];
  const jucator2 = req.body['juc2'];
  const camera = req.body['camera'];
  console.log(`${jucator1} | ${jucator2} | ${camera}`);

  if (jucator1.trim() !== '') {
    Room.findOneAndUpdate(
      { NumarCamera: camera },
      { $set: { 'players.0': jucator1.trim() } }
    )
      .then(() => {
        console.log('Jucator1 added successfully.');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  if (jucator2.trim() !== '') {
    Room.findOneAndUpdate(
      { NumarCamera: camera },
      { $set: { 'players.1': jucator2.trim() } }
    )
      .then(() => {
        console.log('Jucator2 added successfully.');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  setTimeout(() => {
    res.redirect('/');
  }, 1000);
});

// Pornirea serverului
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
