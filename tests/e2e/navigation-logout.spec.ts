import { test } from "../../fixtures/authFixture";
import { ProductsPage } from "../../pages/ProductsPage";

test("should logout user from burger menu", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.goto("/inventory.html");
    await productsPage.assertIsVisible();

    await productsPage.burgerMenu.click();
    await page.getByRole("link", { name: "Logout" }).click();

    await page.waitForURL("**/saucedemo.com");
});
