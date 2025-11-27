import { FullConfig, chromium } from "@playwright/test";
import { standardUser } from "./data/users";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto("https://www.saucedemo.com/");

    await page.getByPlaceholder("Username").fill(standardUser.username);
    await page.getByPlaceholder("Password").fill(standardUser.password);
    await page.getByRole("button", { name: "Login" }).click();

    // is loggin correct
    await page.waitForURL("**/inventory.html");

    await page.context().storageState({
        path: "storageStates/standardUser.json",
    });

    await browser.close();
}

export default globalSetup;
