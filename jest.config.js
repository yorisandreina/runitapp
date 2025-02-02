module.exports = {
  transformIgnorePatterns: [
    "/node_modules/(?!firebase)/",
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};