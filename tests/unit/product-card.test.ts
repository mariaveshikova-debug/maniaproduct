import { expect, test, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { ProductCard } from "@/components/product-card";

vi.mock("next/image", async () => {
  const React = await import("react");
  return {
    default: ({
      src,
      alt,
      className,
    }: {
      src: string;
      alt: string;
      className?: string;
    }) => React.createElement("img", { src, alt, className }),
  };
});

const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

test("карточка показывает название, категорию, цену и изображение", () => {
  const html = renderToStaticMarkup(
    createElement(ProductCard, {
      title: "Ваза «Дюна»",
      category: "Керамика",
      price: 4890,
      image: "/demo-decor/vaza-duna.svg",
      imageAlt: "Керамическая ваза «Дюна» песочного цвета",
    }),
  );

  expect(html).toContain("Ваза «Дюна»");
  expect(html).toContain("Керамика");
  expect(html).toContain(priceFormatter.format(4890));
  expect(html).toContain('alt="Керамическая ваза «Дюна» песочного цвета"');
});
