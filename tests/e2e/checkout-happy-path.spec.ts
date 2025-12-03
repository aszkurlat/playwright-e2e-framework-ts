import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { checkoutData } from "../../data/checkoutData";
import { standardUser } from "../../data/users";

test("should complete checkout successfully", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // login (without fixture yet)
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill(standardUser.username);
    await page.getByPlaceholder("Password").fill(standardUser.password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/inventory\.html/);

    // shopping flow 
    await productsPage.addProductToCartByName("Sauce Labs Backpack");
    await productsPage.goToCart();

    await cartPage.assertIsVisible();
    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutForm(
        checkoutData.firstName,
        checkoutData.lastName,
        checkoutData.postalCode
    );

    await checkoutPage.continue();
    await checkoutPage.finish();

    await checkoutPage.assertOrderCompleted();
});
