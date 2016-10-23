var buildConfig = {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  };

var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: function(options, callback) {
    var defaultBuilder = new DefaultBuilder(buildConfig, "build", {});
    defaultBuilder.build(options, callback);
  },
  deploy: [
    "ConvertLib",
    "MetaCoin"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  },
  networks: {
    "net42": {
      network_id: 42
    }
  }
};
