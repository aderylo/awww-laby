import { promises as fsp } from "fs";
import { equal } from "assert";
import { Builder, By, Capabilities, until, } from "selenium-webdriver";
import { fun, asyncfun } from "./example.mjs";
import { get_db_memory, get_db_postgres } from "../database/database.mjs";
import { init_func } from "../database/init_db.mjs";
import { describe, it, before, after } from "mocha"
import { get_all_wycieczki, get_wycieczka } from "../database/queries.mjs";
import e from "express";



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


describe("DbTests", () => {
  let db;
  before(async () => {
    db = await get_db_memory();
    await init_func(db);
  });


  it("db retruns booking for existing trip", async () => {
    const response = await get_wycieczka(db, 1);
    equal(Object.keys(response).includes('zgloszenia'), true);
  });

  it("db should contain two trips", async () => {
    const all_trips = await get_all_wycieczki(db);
    equal(all_trips.length, 2);
  });
});



describe("Zadanie 3", () => {
  const driver = new Builder().withCapabilities(Capabilities.firefox()).build();

  let db;
  before(async () => {
    db = await get_db_memory();
    await init_func(db);
  });

  it("Error page check", async () => {
    await driver.get("http://localhost:3000/error");
    await takeScreenshot(driver, 'screenshoot.png');
    const error_msg = await driver.findElement(By.id("error_msg")).getText()
    equal("Nie znaleziono strony o podanym adresie!", error_msg);
  });

  after(() => driver.quit());
});