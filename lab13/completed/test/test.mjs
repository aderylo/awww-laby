import { promises as fsp } from "fs";
import { equal } from "assert";
import { Builder, Capabilities } from "selenium-webdriver";
import { fun, asyncfun } from "./example.mjs";
import { getEnabledCategories } from "trace_events";
import { get_all_wycieczki, get_wycieczka } from "../database/queries.mjs";
import {get_db_memory} from "../database/database.mjs";
import {init_func} from "../database/init_db.mjs";
import { assert } from "console";
import { app } from "../index.mjs";
async function takeScreenshot(driver, file) {
  const image = await driver.takeScreenshot();
  await fsp.writeFile(file, image, "base64");
}

describe("Function", () => {
  it("should output string equal to 'test'", () => {
    equal(fun(), "test");
  });
});

describe("Async function", () => {
  it("should output string equal to 'atest'", async () => {
    const a = await asyncfun();
    console.log(a);
    equal(a, "atest");
  });
});

describe("DatabasTests", ()=> {
   console.log("jeszcze bedzie pieknie");
   var dbe;
  before(async () => {
    dbe = await get_db_memory();
    await init_func(dbe);
  });
  it("dziwne rzeczy", async () => {
    const d2 = await get_wycieczka(dbe, 1);
    const d3 = Object.keys(d2);
    equal(d3.includes('zgloszenia'), true);
    const data = await get_all_wycieczki(dbe);
    const d = Object.keys(data);
    console.log(d.length);
    equal(d.length,2);
  });
});

describe("Selenium test", () => {
  const TIMEOUT = 10000;
  const driver = new Builder().withCapabilities(Capabilities.firefox()).build();

  before(async () => {
    await driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
  });

  it("should go to google.com and check title", async () => {
    await driver.get("https://www.google.com");
    await takeScreenshot(driver, "test.png");
    const title = await driver.getTitle();
    equal(title, "Google");
  });

  after(() => driver.quit());
});