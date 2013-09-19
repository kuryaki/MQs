var kue = require('kue');
var jobs = kue.createQueue();
var prompt = require('prompt');

prompt.start();

var createMail = function(){
  prompt.get(['To', 'Subject', 'Content'], function (err, result) {
    if (err) { return onErr(err); }
    result.title = JSON.stringify(result);

    // jobs.create('email', result).save();

    // jobs.create('email', result).save(done);

    // jobs.create('email', result).attempts(5).save(done);

    // var job = jobs.create('email', result).save();
    // job.on('complete', function(){
    //   console.log("Job complete");
    // }).on('failed', function(){
    //   console.log("Job failed");
    // }).on('progress', function(progress){
    //   console.log('\r  job #' + job.id + ' ' + progress + '% complete');
    // });

    jobs.create('email', result).delay(15000).save();
    jobs.promote();

    console.log('Email Job Created');

    createMail();
  });
}

createMail();

// function done(error){
//   if(error){console.log(error);return;}
// }

kue.app.listen(3000);

function onErr(err) {
  console.log(err);
  return 1;
}
