var zmq = require('zmq');
var publisher = zmq.socket('pub');

publisher.bindSync('tcp://*:5556');
publisher.bindSync('ipc://weather.ipc');

var services = 0;

function zeropad(num) {
  while (num.length < 7) {
    num = '0' + num;
  }
  return num;
};

function rand(upper, extra) {
  var num = Math.abs(Math.round(Math.random() * upper));
  return num + (extra || 0);
};

function service(){

  var neighborhood = rand(200, 1);
  var address = 'Fake Street ' + rand(1000, 1);
  var phoneNumber = rand(20, 300) + '' + zeropad(rand(10000000));
  var id = rand(100000000000).toString(36);
  var aService = neighborhood + '-' + address + '-' + phoneNumber + '-' + id;

  console.log(aService);

  publisher.send(aService);

  setTimeout(service, rand(500,500));
}

setTimeout(service, rand(500,500));
