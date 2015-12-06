'use strict';

angular.module('motivateDapp', [])

.constant("appConfig", {
        "url": "http://localhost:9001"
})

.factory( "EthereumQueryFactory", function( $q, appConfig ) {
  // A place to hold the user so we only need fetch it once.
  var web3 = new Web3(new Web3.providers.HttpProvider(appConfig.url));
  //var deferred = $q.defer();

  var eth = {
  	isConnected: web3.isConnected()
  }
  

  return eth;
});

;