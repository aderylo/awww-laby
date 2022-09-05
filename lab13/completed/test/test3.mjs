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

describe("Zadanie 3", () => {
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

  it("check error", async () => {
  await driver.get("http://localhost:3000/error");
   await takeScreenshot(driver, 'plik_na_screenshota.png');
    const a1 =  await driver.findElement(By.id("error_msg")).getText()
    equal("Nie znaleziono strony o podanym adresie!", a1);
  });

  after(() => driver.quit());
});

