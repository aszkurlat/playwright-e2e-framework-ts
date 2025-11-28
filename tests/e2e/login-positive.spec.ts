import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";

import { standardUser } from "../../data/users";

test("should login successfully with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);


    await expect(page).toHaveURL("**/inventory.html");
});
