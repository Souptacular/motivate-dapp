#Interfacing with contracts

###Import web3.js

```
var Web3 = require("web3")
if(typeof web3 === 'undefined')
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
```
You should check that there is actually a node running, using `web3.isConnected()`
If not, block the user with a dialouge instructing them to run `geth --rpc --rpcport 8545 --rpccorsdomain "motivate.on.ether.camp" --unlock 0`


##Using Contracts

```var contract = web3.eth.contract(*ABI*).at(*address*)```
-This defines a contract interface. You'll do all your interaction through this object
-The object has methods corresponding to each of the public functions of the contract
-The *ABI* is a string that encodes the public functions available. I will provide this once I'm done, as it's generated at compile-time.
-The *address* is just the address of the contract
-The methods take the same arguments as the contract functions

##Calling versus executing 

If a function is declared `constant` in the contract, it can be called locally, without sending a transaction  
Just call the function normally to get the return value.

For functions that cause a state change, the last argument passed in must be a transaction object

```
foo.bar(2) // Immediately returns 
foo.bar(2,{from: web3.eth.accounts[0] ,to:"0xabcd...", value:web3.toWei(123,"ether"),gas:500000}) // Returns a TX hash, no return value
```


I will continue this tomorrow, once I have all the public APIs in place. Also need to describe Events

https://github.com/ethereum/wiki/wiki/JavaScript-API

https://github.com/ethereum/web3.js/tree/master/example
