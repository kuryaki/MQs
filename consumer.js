var kue = require('kue');
var jobs = kue.createQueue();
var mail = require('./lib/mail');

jobs.process('email', function(job, done){

  mail.send(job.data.To, job.data.Subject, job.data.Content, done);

  // setTimeout(function(){
  //   job.progress('20', '100');
  // }, 5000); // 20%
  // setTimeout(function(){
  //   job.progress('50', '100');
  // }, 10000); // 50%
  // setTimeout(function(){
  //   job.progress('70', '100');
  // }, 20000); // 70%
  // setTimeout(function(){
  //   mail.send(job.data.To, job.data.Subject, job.data.Content, done);
  // }, 30000); // 100% and done

});