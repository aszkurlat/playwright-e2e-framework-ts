import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly title: Locator;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator(".title");
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.cartItems = page.locator(".cart_item");
    }

    async assertIsVisible() {
        await expect(this.title).toHaveText("Your Cart");
    }

    async removeItemByName(productName: string) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.getByRole("button", { name: "Remove" }).click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async getItemsCount() {
        return this.cartItems.count();
    }
}
