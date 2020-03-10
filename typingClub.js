var learning = require('./learning.js');

learning(async (engine) => {  
try {
  await engine.page.goto('https://www.typingclub.com/login.html');
  await engine.page.waitForSelector('.inpt.ed-input-log-in');

  //add username for typing club
  await engine.page.type('input[id="username"]', 'PUT EMAIL USERNAME HERE');

  //add password for typing club
  await engine.page.type('input[id="password"]', 'PUT PASSWORD HERE');

  await engine.page.click('#login-with-password.btn.log-in-with');
  await engine.page.waitForSelector('.lp-card-details');
  await engine.page.waitFor(1500);
  await engine.page.goto('https://www.typingclub.com/sportal/stats.html');
  await engine.page.waitForSelector('.col-md-4');
  await engine.page.waitFor(1500);

  const innerText = await engine.page.evaluate(() => document.querySelector('.col-md-4').innerText);
  console.log(innerText);
  }
  catch (error){
	console.log("error");
	throw error;
  }
});
