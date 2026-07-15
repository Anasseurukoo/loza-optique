import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "../../../components/ProductGallery";
import ProductCard from "../../../components/ProductCard";
import Navbar from "../../../components/Navbar";
import {
  getProductBySlug,
  products,
} from "../../../lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug &&
        item.category === product.category,
    )
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f6f1e7] px-6 pb-24 pt-32 text-[#102f36]">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#526b6c] transition hover:text-[#103943]"
          >
            <ChevronLeft size={18} />
            Retour aux collections
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <ProductGallery
              images={product.images}
              name={product.name}
            />

            <section className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
                {product.category === "vue"
                  ? "Lunettes de vue"
                  : "Lunettes de soleil"}
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                {product.name}
              </h1>

              <p className="mt-3 text-sm text-[#6c7d7b]">
                {product.reference}
              </p>

              {product.badge && (
                <span className="mt-6 inline-flex rounded-full bg-[#d6bd82]/30 px-4 py-2 text-xs font-semibold text-[#704f16]">
                  {product.badge}
                </span>
              )}

              <p className="mt-8 text-lg leading-8 text-[#526b6c]">
                {product.description}
              </p>

              <div className="mt-10 border-y border-[#103943]/15 py-7">
                <p className="text-sm text-[#6c7d7b]">Couleur</p>
                <p className="mt-2 font-semibold">{product.color}</p>

                <p className="mt-6 text-sm text-[#6c7d7b]">
                  Collection
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {product.audience.map((audience) => (
                    <span
                      key={audience}
                      className="rounded-full border border-[#103943]/20 px-5 py-2 text-sm capitalize"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/#contact"
                  className="rounded-full bg-[#103943] px-7 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-[#103943]/15 transition hover:-translate-y-1 hover:bg-[#071d22]"
                >
                  Prendre rendez-vous
                </Link>

                <Link
                  href="/#collections"
                  className="rounded-full border border-[#103943]/25 px-7 py-4 text-center text-sm font-semibold transition hover:-translate-y-1 hover:bg-white"
                >
                  Voir les collections
                </Link>
              </div>

              <div className="mt-10 rounded-[2rem] bg-white/60 p-7">
                <h2 className="text-lg font-semibold">
                  Caractéristiques
                </h2>

                <ul className="mt-5 space-y-4">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-[#526b6c]"
                    >
                      <span className="rounded-full bg-[#103943] p-1 text-white">
                        <Check size={13} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-xs leading-5 text-[#6c7d7b]">
                Produit présenté à titre de démonstration. Les références,
                disponibilités et tarifs seront confirmés directement par
                LOZA Optique.
              </p>
            </section>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-28">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a27d38]">
                À découvrir également
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                Modèles similaires
              </h2>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}