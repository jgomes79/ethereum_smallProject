var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MyCoin.deployed();

  meta.getContractBalance.call().then(function(value) {
    var contractBalance = document.getElementById("contractBalance");
    contractBalance.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting contract balance; see log.");
  });

  meta.getExternalAccountABalance.call().then(function(value) {
    var accountABalance = document.getElementById("accountABalance");
    accountABalance.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting account A balance; see log.");
  });

  meta.getExternalAccountBBalance.call().then(function(value) {
    var accountBBalance = document.getElementById("accountBBalance");
    accountBBalance.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting account B balance; see log.");
  });
};

function sendCoin() {
  var meta = MyCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
