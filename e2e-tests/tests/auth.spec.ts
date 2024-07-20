import { test, expect } from '@playwright/test';

const UI_URL = "http:localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@gmail.com");
  await page.locator("[name=password]").fill("111111");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Signed in Successfully!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SIgn Out" })).toBeVisible();

});

test("should allow user to rgister", async({page}) => {
  const randomSixDigitNumber = Math.floor(100000 + (Math.random() * 900000));
  const testEmail = `test_register_${randomSixDigitNumber}@test.com`
  await page.goto(UI_URL);

  await page.getByRole("link", {name:"Sign In"}).click();
  await page.getByRole("link", {name: "Create an account here"}).click();
  await expect(page.getByRole("heading", {name:"Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("testFirstName");
  await page.locator("[name=lastName]").fill("testLastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill(randomSixDigitNumber.toString());
  await page.locator("[name=confirmPassword]").fill(randomSixDigitNumber.toString());

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "SIgn Out" })).toBeVisible();

})