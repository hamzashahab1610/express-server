const express = require('express');
const path = require('path');
const logger = require('./middleware/Logger');
const exphbs = require('express-handlebars');
const members = require('./Members')

const PORT = process.env.PORT || 5000;

const app = express();

//Init Middleware
//app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Members api routes
app.use('/api/members/', require('./routes/api/members'))

//Homepage route
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Members App',
      members
    })
})

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});