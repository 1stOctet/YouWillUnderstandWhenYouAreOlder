var learning = require('./learning.js');

learning(async (engine) => {  
try {
  await engine.page.goto('https://www.khanacademy.org/login?continue=%2F');
  await engine.page.waitFor(1500);

  //add parent username here ***
  await engine.page.type('input[id$="email-or-username"]', 'PUT YOUR USERNAME OR EMAIL ADDRESS HERE');

  //add parent password here ***
  await engine.page.type('input[id$="password"]', 'PUT YOUR PASSWORD HERE');

  const [button] = await engine.page.$x("//button[contains(., 'Log in')]");
  if (button) {await button.click();}
  await engine.page.waitFor(1500);

  //This URL will work if your childs NEW account is called child1 ***
  await engine.page.goto('https://www.khanacademy.org/parent/child/child1/');  

  await engine.page.waitFor(1500);
  //let url = await engine.page.url();
  //console.info(`The url is: ${url}`);
  //let title = await engine.page.title();
  //console.info(`The title is:${title}`);
  const innerText = await engine.page.evaluate(() => document.querySelector('.energy-points-badge').innerText);
  console.log(innerText);
  }
  catch (error){
	console.log("caught error");
	throw error;
  }
});
