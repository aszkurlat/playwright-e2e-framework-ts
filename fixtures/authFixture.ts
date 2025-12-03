import { test as base } from "@playwright/test";

export const test = base.extend({
    context: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: "storageStates/standardUser.json"
        });
        await use(context);
    },

    page: async ({ context }, use) => {
        const page = await context.newPage();
        await use(page);
    }
});

export const expect = test.expect;
