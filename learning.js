const puppeteer = require('puppeteer');
const getStdin = require('get-stdin');

module.exports = async (f) => {
  var input = "" //JSON.parse(await getStdin());

  var browser = await puppeteer.launch();
  var page = await browser.newPage();

  var output = {
    id: input.id,
    screenshots: 0
  };

  await page.setViewport({width: 1920, height: 1080});

  var engine = {
    page: page,
    browser: browser,
    input: input,
    output: output,


    autoScreenshot: async () => {
      output.screenshots++;
      return page.screenshot({path: "screenshots/" + input.id + "_" + output.screenshots + ".jpg"});
    },

    // Provide a basic sleep method
    sleep: (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    text: async (selector) => {
      return await page.$$eval(selector, (all) => {
        return all.map((e) => e.innerText).join(' ').trim();
      });
    },

    regexp: async (selector, pattern) => {
      var text = await engine.text(selector);
      if (text.length <= 0) { return ""; }
      var regexp = (pattern instanceof RegExp) ? pattern : (new RegExp(pattern, "gi"));
      var match = regexp.exec(text);
      return match ? String(match[1]).trim() : "";
    },

    regexpList: async (selector, pattern) => {
      return await page.$$eval(selector, (all, pattern) => {
        var list = [];

        all.forEach((e) => {
          var regexp = new RegExp(pattern, 'gi');
          var match = regexp.exec(e.innerText);
          if (match && match.length > 1) { list.push(match[1]); }
        });

        return list;
      }, pattern);
    },

    dataList: async (key) => {
      return await page.$$eval("[data-" + key + "]", (all, key) => {
        var list = [];
        all.forEach((e) => list.push(e.attributes['data-' + key].value));
        return list;
      }, key);
    },

    sum: (list) => {
      var sum = 0;
      if (!list || list.length <= 0) { return; }
      list.forEach((x) => { sum += Number(x); });
      return sum;
    },

    clickAndWait: async (button, goodSelector, badSelector) => {
      await page.click(button, {delay: 10});
      await page.waitForFunction((goodSelector, badSelector) => {
        var exists = false;

        function check(el) {
          if (window.getComputedStyle(el).display !== 'none') {
            exists = exists || (String(el.innerText || "").trim().length > 0);
          }
        }

        document.querySelectorAll(badSelector).forEach(check);
        document.querySelectorAll(goodSelector).forEach(check);
        return exists;
      }, {}, goodSelector, badSelector);

      var error = await engine.text(badSelector);

      if (error.length) {
        engine.problem(error);
      }
    },

    problem: (reason) => {
      engine.output.problem = reason;
      throw new Error("Website reported a problem");
    }
  };

  var exitcode = 0;

  try {
    output.points = await f(engine);
    await engine.autoScreenshot();
  } catch (error) {
    await engine.autoScreenshot();
    process.stderr.write(String(error.stack));
    output.error = String(error.message || "Script error");
    process.stderr.write(output.error)
    exitcode = 1;
  }

  await page.close();
  await browser.close();

  //await process.stdout.write(JSON.stringify(output));
  process.exit(exitcode);
};
