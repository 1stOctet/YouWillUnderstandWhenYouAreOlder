var learning = require('./learning.js');

learning(async (engine) => {  
try {
  await engine.page.goto('https://www.khanacademy.org/login?continue=%2F');
  await engine.page.waitFor(1500);

  //add parent username here ***
  await engine.page.type('input[id$="email-or-username"]', 'youremail@gmail.com');      // <--------STEP 1

  //add parent password here ***
  await engine.page.type('input[id$="password"]', 'ChangeThisToYourParentPassword');   // <---------STEP 2


  const [button] = await engine.page.$x("//button[contains(., 'Log in')]");
  if (button) {await button.click();}
  await engine.page.waitFor(1500);

  //fix this url, the kaid_763278946 will be for your child
  await engine.page.goto('https://www.khanacademy.org/profile/kaid_CHANGETHISID');    // <----------STEP 3

  await engine.page.waitFor(8000);
  const body = await engine.page.evaluate(() => {
  return {'body': document.body.innerText};
  });
  console.log('body:',body);

  
  }
  catch (error){
	console.log("caught error");
	throw error;
  }
});
