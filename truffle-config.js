const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  
  compilers: {
    solc: {
      version: "^0.7.4", // A version or constraint - Ex. "^0.5.0"
    }
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
	dev: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*",// Any network (default: none)
	  websockets: true, 	  
    },
	develop: {
		host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*",// Any network (default: none)
	  websockets: true
    }

  }
};
