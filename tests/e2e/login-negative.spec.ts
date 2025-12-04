import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { lockedOutUser, invalidUser } from "../../data/users";

test.describe("Login - negative scenarios @regression", () => {

    test("should show error for locked out user", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(lockedOutUser.username, lockedOutUser.password);

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test("should show error for invalid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(invalidUser.username, invalidUser.password);

        await expect(loginPage.errorMessage).toBeVisible();
    });

});
