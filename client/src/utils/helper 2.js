import getWeb3 from "../getWeb3";
import Certificate from "../contracts/Certificate.json";

// String to UTC EPOCH
 function dateToEpoch(date) {
    return (date.getTime()-date.getMilliseconds())/1000;
  }

  function epochToDate(numString) {
    return new Date(numString*1000).toLocaleDateString('fr-FR');
  }

  async function loadBlockchainData(){
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //web3.setProvider(new web3.providers.WebsocketProvider('ws://localhost:8545'));
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Certificate.networks[networkId];
      const instance = new web3.eth.Contract(
        Certificate.abi,
        deployedNetwork && deployedNetwork.address,
      );


      return {
        web3,
        instance,
        accounts
      }

    } catch (error) {

      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  }
  export { dateToEpoch,epochToDate,loadBlockchainData}