import { expect, test } from "@playwright/test";
import { describe } from "node:test";
import path from "path";


const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.locator("[name=email]").fill("saurab@gmail.com");

  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Successful")).toBeVisible();
});

test("Should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test city");
  await page.locator("[name=country]").fill("Test country");
  await page.locator("[name=description]").fill("This is a description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();


  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("1");

  await page.setInputFiles("[name=imageFiles]",[
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg")
  ])
await page.getByRole("button",{name:"Save"}).click();

await expect(page.getByText("Hotel Saved!")).toBeVisible()
});


test("should display hotels",async({page})=>{
await page.goto(`${UI_URL}my-hotels`);

await expect(page.getByText("My Hotels")).toBeVisible();

await expect(page.getByText("Test Hotel")).toBeVisible();

// await expect(page.locator(':has-text("This is a description")')).toBeVisible();
await expect(page.getByText("This is a description")).toBeVisible();


await expect(page.getByText("Test city, Test country")).toBeVisible();

await expect(page.getByText("Budget")).toBeVisible();

await expect(page.getByText("100 per night")).toBeVisible();

await expect(page.getByText("2 adults, 1 children")).toBeVisible();

await expect(page.getByText("3 Star Rating")).toBeVisible();


await page.getByRole("link",{name:"View Hotel"}).click()


})


test("Should allow user to edit a hotel",async({page})=>{
  await page.goto(`${UI_URL}my-hotels`)

  await expect(page.getByText("My Hotels")).toBeVisible();

  await expect(page.getByText("Damak").first()).toBeVisible()

  await page.getByRole("link",{name:"View Hotel"}).click()

  await expect(page.getByText("Add Hotel")).toBeVisible();   

  // await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=country]").fill("Test country");


  // await page.getByRole("button",{name:"delete"}).nth(0).click()
  await page.getByRole("button",{name:"delete"}).nth(1).click()


  // await page.setInputFiles("[name=imageFiles]",[
  //   path.join(__dirname, "files", "1.jpg"),
  //   path.join(__dirname, "files", "2.jpg")
  // ])

await page.getByRole("button",{name:"Save"}).click();

await expect(page.getByText("Hotel Updated!")).toBeVisible()



})