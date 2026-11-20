import { test, expect } from "@playwright/test";

test("серверный маршрут доступен без ключей", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toMatchObject({ ok: true });
});
