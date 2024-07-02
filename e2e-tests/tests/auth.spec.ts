import { test, expect } from '@playwright/test';


const UI_URL="http://localhost:5173/"


test('should all the user to sign in', async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByRole("link",{name:"Sign In"}).click();

    await expect(page.getByRole("heading",{name:"Login"})).toBeVisible()

    await page.locator("[name=email]").fill("saurab@gmail.com")

    await page.locator("[name=password]").fill("saurab")

    await page.getByRole("button",{name:"Login"}).click()

    await expect(page.getByText("Login Successful")).toBeVisible()

    await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()

    await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()

});

test('Should allow the user to register', async ({ page }) => {
   await page.goto(UI_URL)

   await page.getByRole("link",{name:"Sign In"}).click()

   await expect(page.getByRole("heading",{name:"Login"})).toBeVisible()

   await page.getByRole("link",{name:"Click here"}).click()

   await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible()

   await page.locator("[name=firstName]").fill("Sudip")

   await page.locator("[name=lastName]").fill("Niroula")

   await page.locator("[name=email]").fill("sudip2@gmail.com")

   await page.locator("[name=password]").fill("123456")

   await page.locator("[name=confirmPassword]").fill("123456")

  await page.getByRole("button",{name:"Create Account"}).click()

  await expect(page.getByText("Registration Success!")).toBeVisible()

  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()

  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()

});
