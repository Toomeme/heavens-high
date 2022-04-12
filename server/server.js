const express = require('express');
// import ApolloServer and socket
const { ApolloServer } = require('apollo-server-express');
const socketio = require('socket.io');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const { authMiddleware } = require('./utils/auth');

const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("/service-worker.js", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  const http = app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
  // Attach socket.io to the server instance
const io = socketio(http)
io.on('connection', (socket) => {

	socket.on("show_score", (data) => {
		socket.broadcast.emit("show-score", data);
    console.log("score"+ data)
	});
})
});
