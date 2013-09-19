//super simple rpc server example
var amqp = require('amqp')
  , util = require('util');
 
var connection = amqp.createConnection({host:'127.0.0.1'});
 
connection.on('ready', function(){
  console.log("Kitchen Ready!!");
  connection.queue('kitchen', function(q){
      q.subscribe(function(message, headers, deliveryInfo, m){

        var order = message.order;
        var cooking_time = 10000;
        var complexity = parseInt(order.id);

        util.log(util.format( 'Started Cooking ', order.name, '...'));
        setTimeout(function(){

          connection.publish(m.replyTo, {response:"OK", order:order, orderNumber:message.orderNumber}, {
            contentType:'application/json',
            contentEncoding:'utf-8',
            correlationId:m.correlationId
          });

        }, cooking_time*complexity); // cooking time

      });
  });
});