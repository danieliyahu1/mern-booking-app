import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add a hotel", async ({page}) => {
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator(`[name="name"]`).fill("Test Hotel");
    await page.locator(`[name="city"]`).fill("Test City");
    await page.locator(`[name="country"]`).fill("Test country");
    await page.locator(`[name="description"]`).fill("Test description");
    await page.locator(`[name="pricePerNight"]`).fill("100");
    await page.selectOption(`select[name="starRating"]`, "3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator(`[name="adultCount"]`).fill("2");
    await page.locator(`[name="childCount"]`).fill("2");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "dbz hotel 1.jfif"),
        path.join(__dirname, "files", "dbz hotel 2.jfif"),
        path.join(__dirname, "files", "dbz hotel 3.jfif")
    ]);

    await page.getByRole('button', {name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({page}) => {
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText("Gedera Hostel")).toBeVisible();
    await expect(page.getByText("Jalu production hotel")).toBeVisible();
    await expect(page.getByText("Gedera, Israel")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("120 $ per night")).toBeVisible();
    await expect(page.getByText("1 adults, 0 children")).toBeVisible();
    await expect(page.getByText("5 star rating")).toBeVisible();

    await expect(page.getByRole("link", {name:"View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link", {name:"Add Hotel"})).toBeVisible();

});

test("should edit hotel", async({page})=>{
    const curName = "Gedera Hostel"
    const newName = "Connect"
    await page.goto(`${UI_URL}/my-hotels`);
    await page.getByRole('link', {name: "View Details"}).first().click();

    await page.waitForSelector(`[name="name"]`, {state: "attached"})
    await expect(page.locator(`[name="name"]`)).toHaveValue(curName)
    await page.locator(`[name="name"]`).fill(newName)
    await page.getByRole("button", { name: "Save"}).click();
    await expect(page.getByText("Hotel Edited!")).toBeVisible();

    await page.reload();

    await expect(page.locator(`[name="name"]`)).toHaveValue(newName)
    await page.locator(`[name="name"]`).fill(curName)
    await page.getByRole("button", { name: "Save"}).click();
})