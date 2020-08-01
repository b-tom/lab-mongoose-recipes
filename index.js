const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
    .create(newRecipe)
    .then(result => console.log(`recipe added${result}`))
    .catch(err => console.log(err));

    Recipe.insertMany(data)
    .then(result => { 
      result.forEach(item => {
        console.log(`recipe from ${item.title} inserted successfully`);
        });
      })
    .catch(error => console.log(error));

    Recipe
    .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then(() => console.log('recipe updated'))
    .catch(err => console.log(err));

    Recipe
    .deleteOne({ title: 'Carrot Cake' })
    .then(() => console.log(`The recipe is deleted`))
    .catch(err => console.log(err));

  })
  .catch();

  const newRecipe = new Recipe ({
    title: 'tomas',
    level: 'Easy Peasy',
    ingredients: 'nothing',
    cuisine: 'french',
    dishType: 'breakfast',
    duration: 10,
    creator: 'tomas'
  });
  
  mongoose.connection
  .close()
  .then(() => console.log(`connection closed`))
  .catch(err => console.log(`error ocurred during database connection closing: ${err}`));

  