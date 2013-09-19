var zmq = require('zmq');
var subscriber = zmq.socket('sub');
var _ = require('underscore');

console.log("Taxi open for Services");

var zone, neighborhood = null;
if (process.argv.length > 2) {
  neighborhood = parseInt(process.argv[2]);
  zone = calculateZone(neighborhood);
} else {
  zone = ['98', '99', '100', '101', '102'];
}

function calculateZone(neighborhood){
  var aZone = [];
  aZone.push((neighborhood-2).toString());
  aZone.push((neighborhood-1).toString());
  aZone.push(neighborhood.toString());
  aZone.push((neighborhood+1).toString());
  aZone.push((neighborhood+2).toString());
  return aZone;
}

console.log('Currently in zone:', zone);

_.each(zone, function(neighborhood){
  subscriber.subscribe(neighborhood);
});

subscriber.on('message', function(data) {

  var pieces      = data.toString().split('-');
  var address     = pieces[1];
  var phoneNumber = pieces[2];
  var serviceId   = pieces[3];

  console.log('New service[%s] at: %s, call the passenger at %s', serviceId, address, phoneNumber);
});

subscriber.connect("tcp://localhost:5556");