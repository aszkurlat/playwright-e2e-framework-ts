import { test as base } from "@playwright/test";

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.context().addInitScript(() => {
        });

        await use(page);
    },
});

export const expect = test.expect;
