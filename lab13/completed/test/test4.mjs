import { promises as fsp } from "fs";
import { equal } from "assert";
import { get_db_postgres } from "../database/database.mjs";
import { init_func } from "../database/init_db.mjs";
import { Builder, By, Capabilities } from "selenium-webdriver";
import { app } from'../index.mjs';

async function takeScreenshot(driver, file) {
    const image = await driver.takeScreenshot();
    await fsp.writeFile(file, image, "base64");
  }

import { promises as fsp } from "fs";
import { equal } from "assert";
import { get_db_postgres } from "../database/database.mjs";
import { init_func } from "../database/init_db.mjs";
import { app } from'../index.mjs';
import { Builder, By, until, Capabilities } from "selenium-webdriver";

async function takeScreenshot(driver, file) {
  const image = await driver.takeScreenshot();
  await fsp.writeFile(file, image, "base64");
}

describe("Zadanie 4", () => {
  const TIMEOUT = 100000;
  const driver = new Builder().withCapabilities(Capabilities.firefox()).build();

  let db;
  before(async () => {
    await driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    db = await get_db_postgres();
    await init_func(db);
  });

  it("should check if submitting correct form works", async () => {
    await driver.get("localhost:3000/book/1");
    await takeScreenshot(driver, "test2.png");
    await driver.findElement(By.id('first_name')).sendKeys("Malgosia");
    await driver.findElement(By.id('last_name')).sendKeys("Gwiazda");
    await driver.findElement(By.id('phone')).sendKeys("111111111");
    await driver.findElement(By.id('email')).sendKeys("ma@o2.pl");
    await driver.findElement(By.id('n_people')).sendKeys(2);

    await driver.findElement(By.id('gdpr_permission')).click();

    await driver.findElement(By.id('submitid')).click();
    await driver.wait(until.elementLocated(By.id('info')));

    const a = await driver.getCurrentUrl();
    equal(a, "http://localhost:3000/book-success/1");
    await takeScreenshot(driver, "test4.png");

  });

  after(() => driver.quit());
});