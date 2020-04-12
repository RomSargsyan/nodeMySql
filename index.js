const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');
const todoRouter = require('./routes/todo');
const sequelize = require('./utils/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

// app.use('/api/todo', todoRouter);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

app.use((req, res) => {
    res.sendFile('/index.html')
    // res.end()
})

async function start() {
    try {
      await sequelize.sync()
      app.listen(PORT)
    } catch (e) {
      console.log(e)
    }
  }
  
  start()