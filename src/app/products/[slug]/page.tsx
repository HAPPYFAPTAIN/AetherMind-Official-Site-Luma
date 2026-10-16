import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductDetailPage } from "@/components/ProductDetailPage";

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.filter(p => !["md-exp", "learn-everything"].includes(p.id)).map(p => ({ slug: p.id }));
}
export default async function ProductRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find(p => p.id === slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
