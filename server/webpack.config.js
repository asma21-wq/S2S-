const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server.js', // Your main server file
  target: 'node', // Ensures compatibility with Node.js
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  output: {
    path: path.resolve(__dirname, 'build'), // Output folder
    filename: 'server.bundle.js', // Output file name
  },
  mode: 'production', // Optimized for production
};
