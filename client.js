//exmaple on how to use amqprpc
var amqp = require('amqp');
var util = require('util');
var connection = amqp.createConnection({host:'127.0.0.1'});
 
var rpc = new (require('./amqprpc'))(connection);
 
connection.on("ready", function(){
  console.log("ready");

  var menu = 
  [
    {name:'Pizza', id:1},
    {name:'Lasagna', id:2},
    {name:'Spaghetti‎', id:3}
  ];

  var orders=0; //counter of pending requests
 
  //do a number of requests
  for(var i=1; i<=10 ;i+=1){
    //we are about to make an order, increase counter
    orders += 1;

    var order = menu[Math.floor(Math.random()*3)];

    util.log(util.format('Received order #', i, ' ', order.name));

    rpc.makeRequest('kitchen', {order:order, orderNumber:i}, function response(err, response){
      if(err){console.error(err);}
      else{
        util.log(util.format("Finished order #", response.orderNumber, ' ',response.order.name));
      }
      //reduce for each timeout or response
      orders-=1;
      isAllDone();
    });
  }
 
  function isAllDone() {
    //if no more outstanding then close connection
    if(orders === 0){
      connection.end();
    }
  }
 
});