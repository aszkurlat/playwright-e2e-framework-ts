import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";

test("should remove item from cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("**/inventory.html");

    //add product to cart and go to cart page
    await productsPage.addProductToCartByName("Sauce Labs Backpack");
    await productsPage.goToCart();

    await cartPage.assertIsVisible();

    await cartPage.removeItemByName("Sauce Labs Backpack");

    const count = await cartPage.getItemsCount();
    expect(count).toBe(0);
});
