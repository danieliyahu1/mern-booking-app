import { test, expect } from "@playwright/test";

const UI_URL = "http:localhost:5173"

test.beforeEach(async ({page}) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("1@gmail.com");
    await page.locator("[name=password]").fill("111111");

    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Signed in Successfully!")).toBeVisible();
});

test("Should show hotel search results", async({page}) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("israel");
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText("Hotels found in israel")).toBeVisible();
    await expect(page.getByText("Gedera Hostel")).toBeVisible();
})

test("should show hotel detail", async({page}) => {
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("israel");
    await page.getByRole('button', { name: 'Search' }).click();

    await page.getByText("Gedera Hostel").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", {name: "Book now"})).toBeVisible();

});