import { HomeStorefront } from "@/components/home-storefront";

export default function Home() {
  return (
    <HomeStorefront>
      <section className="py-8 text-center sm:py-10" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-display font-semibold text-primary">
          Дом вверх дном
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-title font-semibold text-ink">
          Предметы, которые делают дом гармоничным
        </p>
        <p className="mx-auto mt-3 max-w-xl text-body text-secondary">
          Дизайнерский декор для вашего пространства — с продуманным подбором и
          бережной доставкой
        </p>
      </section>
    </HomeStorefront>
  );
}
