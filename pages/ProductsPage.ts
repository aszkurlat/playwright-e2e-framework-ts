import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartIcon: Locator;
    readonly burgerMenu: Locator;
    readonly sortSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator(".title");
        this.cartIcon = page.locator(".shopping_cart_link");
        this.burgerMenu = page.getByRole("button", { name: "Open Menu" });
        this.sortSelect = page.locator("[data-test='product_sort_container']");
    }

    async assertIsVisible() {
        await expect(this.title).toHaveText("Products");
    }

    async addProductToCartByName(productName: string) {
        const product = this.page.locator(".inventory_item").filter({ hasText: productName });
        await product.getByRole("button", { name: "Add to cart" }).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async sortBy(option: string) {
        await this.sortSelect.selectOption({ label: option });
    }
}
