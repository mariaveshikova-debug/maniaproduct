import { test, expect, type Locator } from "@playwright/test";

const expectedProducts = [
  ["Ваза «Дюна»", "Керамика", 4890, "Керамическая ваза «Дюна» песочного цвета"],
  ["Светильник «Ореол»", "Свет", 12400, "Настольный светильник «Ореол» с янтарным светом"],
  ["Панно «Лунный свет»", "Текстиль", 7250, "Текстильное панно «Лунный свет» с янтарной луной"],
  ["Подставка «Ритм»", "Дерево", 3600, "Деревянная подставка «Ритм» с янтарными кругами"],
  ["Зеркало «Арка»", "Зеркала", 8900, "Арочное зеркало «Арка» в тёмно-зелёной раме"],
  ["Подсвечник «Искра»", "Металл", 2400, "Янтарный металлический подсвечник «Искра» со свечой"],
  ["Декоративная чаша «Прилив»", "Стекло", 5200, "Стеклянная чаша «Прилив» с волнистым краем"],
  ["Скульптура «Баланс»", "Камень", 6700, "Скульптура «Баланс» из трёх округлых камней"],
] as const;

const actionNames = ["Войти", "Заказы", "Избранное", "Корзина"];
const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

function box(element: Locator) {
  return element.evaluate((node) => {
    const { left, top, width, height } = node.getBoundingClientRect();
    return { left, top, width, height };
  });
}

test("главная показывает вступление и восемь товаров в двух рядах", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Дом в ладу" })).toBeVisible();
  await expect(page.getByText("Предметы, которые делают дом гармоничным")).toBeVisible();
  await expect(page.getByText(
    "Дизайнерский декор для вашего пространства — с продуманным подбором и бережной доставкой",
  )).toBeVisible();

  const cards = page.getByRole("article");
  await expect(cards).toHaveCount(8);

  for (const [index, [title, category, price, imageAlt]] of expectedProducts.entries()) {
    const card = cards.nth(index);
    await expect(card.getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(card.getByText(category, { exact: true })).toBeVisible();
    await expect(card.getByText(priceFormatter.format(price), { exact: true })).toBeVisible();
    const image = card.getByRole("img", { name: imageAlt });
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  }

  const positions = await Promise.all((await cards.all()).map(box));
  expect(new Set(positions.slice(0, 4).map(({ top }) => top)).size).toBe(1);
  expect(new Set(positions.slice(4).map(({ top }) => top)).size).toBe(1);
  expect(positions[4].top).toBeGreaterThan(positions[0].top);
  expect(positions.slice(0, 4).map(({ left }) => left)).toEqual(
    positions.slice(4).map(({ left }) => left),
  );
  expect(new Set(positions.slice(0, 4).map(({ left }) => left)).size).toBe(4);
});

test("широкая шапка показывает исходный логотип, поиск и навигацию в одном ряду", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const header = page.getByRole("banner");
  const logo = header.getByRole("img", { name: "ЛАД" });
  const catalog = header.getByRole("link", { name: "Каталог" });
  const search = header.getByRole("searchbox", { name: "Поиск товаров" });
  const actions = actionNames.map((name) => header.getByRole("button", { name }));

  await expect(header).toHaveCSS("background-color", "rgb(53, 77, 61)");
  await expect(logo).toHaveAttribute("src", "/demo-decor/brand/LAD-classic-04.png");
  await expect.poll(() => logo.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(2600);
  for (const action of actions) {
    await expect(action).toBeDisabled();
  }

  const positions = await Promise.all([logo, catalog, search, ...actions].map(box));
  expect(positions[0].width / positions[0].height).toBeCloseTo(2600 / 1480, 2);
  for (const [index, item] of positions.slice(1).entries()) {
    expect(item.left).toBeGreaterThan(positions[index].left);
    expect(item.top + item.height / 2).toBeCloseTo(
      positions[0].top + positions[0].height / 2,
      0,
    );
  }
  expect(positions[2].width).toBeGreaterThan(positions[0].width);

  await catalog.click();
  await expect(page).toHaveURL(/#catalog$/);
  await expect(page.getByRole("heading", { name: "Каталог", exact: true })).toBeInViewport();
});

test("поиск фильтрует по названию и категории и очищает результаты", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "Поиск товаров" });
  const cards = page.getByRole("article");

  await search.fill("  ДЮНА  ");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("Ваза «Дюна»");

  await search.fill("стекл");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("Декоративная чаша «Прилив»");

  await search.fill("несуществующий товар");
  await expect(cards).toHaveCount(0);
  await expect(page.getByText("Ничего не найдено")).toBeVisible();

  await search.clear();
  await expect(cards).toHaveCount(8);
  await expect(page.getByRole("status").filter({ hasText: "Всего товаров" })).toHaveText("Всего товаров — 8");
});

for (const width of [768, 390, 320]) {
  test(`шапка и каталог помещаются на экране шириной ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");

    const header = page.getByRole("banner");
    const logo = header.getByRole("img", { name: "ЛАД" });
    const catalog = header.getByRole("link", { name: "Каталог" });
    const search = header.getByRole("searchbox", { name: "Поиск товаров" });
    const actions = header.getByRole("group", { name: "Будущие функции" });
    for (const item of [logo, catalog, search, actions]) {
      await expect(item).toBeVisible();
    }
    const [logoBox, catalogBox, searchBox, actionsBox] = await Promise.all(
      [logo, catalog, search, actions].map(box),
    );
    expect(searchBox.top).toBeGreaterThan(logoBox.top);
    expect(searchBox.top).toBeGreaterThan(catalogBox.top);
    if (width === 768) {
      expect(actionsBox.top).toBeLessThan(searchBox.top);
    } else {
      expect(actionsBox.top).toBeGreaterThan(searchBox.top);
    }
    expect(searchBox.width).toBe(width - 40);
    const cards = page.getByRole("article");
    await expect(cards).toHaveCount(8);
    const [first, second] = await Promise.all([box(cards.nth(0)), box(cards.nth(1))]);
    if (width === 768) {
      expect(second.top).toBe(first.top);
      expect(second.left).toBeGreaterThan(first.left);
    } else {
      expect(second.left).toBe(first.left);
      expect(second.top).toBeGreaterThan(first.top);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}
