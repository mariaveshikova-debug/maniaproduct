import Image from "next/image";

export interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  image: string;
  imageAlt: string;
}

const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export function ProductCard({
  title,
  category,
  price,
  image,
  imageAlt,
}: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-caption font-semibold uppercase tracking-wide text-primary">
          {category}
        </p>
        <h3 className="mt-2 text-title font-semibold text-ink">{title}</h3>
        <p className="mt-auto pt-4 text-body font-semibold text-ink">
          {priceFormatter.format(price)}
        </p>
      </div>
    </article>
  );
}
