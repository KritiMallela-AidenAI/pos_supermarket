const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());

app.use(express.json());
//ROUTES
const inventoryRoutes = require('./routes/inventoryRoutes');
const signupRoutes = require('./routes/signupRoutes');
app.use('/', inventoryRoutes);
app.use('/',signupRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // Database synchronization
  sequelize.sync()
    .then(() => {
      console.log('Database connected successfully');
      // Start server
      app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    })
    .catch(err => {
      console.error('Database connection failed:', err);
    });
    