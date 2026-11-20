"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const futureActions = [
  { label: "Войти", path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { label: "Заказы", path: "m12 22 8-4.5v-11L12 2 4 6.5v11L12 22Zm0 0V11 M4 6.5l8 4.5 8-4.5 M8 4.25l8 4.5" },
  { label: "Избранное", path: "M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 22l7.6-7.6 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z" },
  { label: "Корзина", path: "M2 4h3l3 11h11l3-8H6 M10 20h.01 M18 20h.01" },
];

function Icon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export function HomeStorefront({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const searchTerm = query.trim().toLocaleLowerCase("ru-RU");
  const visibleProducts = products.filter(
    ({ title, category }) =>
      title.toLocaleLowerCase("ru-RU").includes(searchTerm) ||
      category.toLocaleLowerCase("ru-RU").includes(searchTerm),
  );

  return (
    <>
      <header className="bg-brand-header text-on-primary">
        <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 px-5 py-4 md:grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_auto_minmax(0,1fr)_auto] lg:gap-x-5">
          <Image
            src="/demo-decor/brand/LAD-classic-04.png"
            alt="ЛАД"
            width={2600}
            height={1480}
            unoptimized
            loading="eager"
            className="h-auto w-36 sm:w-44 lg:w-52"
          />
          <a
            href="#catalog"
            className="flex min-h-11 items-center justify-self-end gap-2 rounded-control bg-surface px-3 font-semibold text-primary hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary md:justify-self-auto lg:px-4"
          >
            <Icon path="M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" />
            Каталог
          </a>
          <div
            role="search"
            aria-label="Каталог товаров"
            className="catalog-search relative col-span-2 min-w-0 md:col-span-3 md:row-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1"
          >
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-primary">
              <Icon path="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 5 5" />
            </span>
            <input
              type="search"
              aria-label="Поиск товаров"
              placeholder="Поиск товаров"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-11 text-ink placeholder:text-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
            />
          </div>
          <div
            role="group"
            aria-label="Будущие функции"
            className="col-span-2 grid grid-cols-4 gap-1 md:col-span-1 md:col-start-3 md:row-start-1 md:justify-self-end lg:col-start-4"
          >
            {futureActions.map(({ label, path }) => (
              <button
                key={label}
                type="button"
                disabled
                className="flex min-h-11 flex-col items-center justify-center gap-1 text-xs text-on-primary/75 sm:px-2 sm:text-caption"
              >
                <Icon path={path} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16">
        {children}
        <section id="catalog" className="mt-6 scroll-mt-5" aria-labelledby="catalog-title">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="catalog-title" className="text-title font-semibold text-ink">
              Каталог
            </h2>
            <p role="status" className="text-caption text-secondary">
              {searchTerm ? "Найдено товаров" : "Всего товаров"} — {visibleProducts.length}
            </p>
          </div>
          {visibleProducts.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-body text-ink">Ничего не найдено</p>
          )}
        </section>
      </main>
    </>
  );
}
