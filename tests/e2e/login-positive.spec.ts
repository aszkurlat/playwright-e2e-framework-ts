import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { standardUser } from "../../data/users";

test("should login successfully with valid credentials @smoke", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);

    await productsPage.assertIsVisible();
});
