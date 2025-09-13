import { Product } from "../products/product.model";
import { Variant } from "../variants/variant.model";

export const mapInputToProduct = (input: Record<string, unknown>): Product => {
  return {
    id: (input.id || "") as string,
    title: (input.title || "") as string,
    subTitle: (input.subTitle || "") as string,
    attributes: (input.attributes || []) as Product["attributes"],
    brand: (input.brand || "") as string,
    description: (input.description || "") as string,
    category: (input.category || "") as string,
    createdAt: (input.createdAt as string) ?? new Date().toISOString(),
    images: (input.images || []) as Product["images"],
    productCategory: (input.productCategory || "") as string,
    productType: (input.productType || "") as string,
    status: (input.status || "draft") as "active" | "inactive" | "draft",
    tags: (input.tags || []) as string[],
    updatedAt: new Date().toISOString(),
    variantSlugs: (input.variantSlugs || []) as string[],
    variants:
      ((input?.variants ?? []) as Variant[])?.map((v) =>
        mapVariantInputToVariant(v)
      ) || [],
  };
};

export const mapVariantInputToVariant = (input: Variant): Variant => {
  return {
    id: (input.id || "") as string,
    color: (input.color || "") as string,
    colorDisplay: (input.colorDisplay || "") as string,
    images: (input.images || ([] as Variant["images"])).map((img) => ({
      id: img.id,
      key: img.key,
      name: img.name,
    })),
    price: (input.price || 0) as number,
    salePrice: (input.salePrice || 0) as number,
    sizes: (input.sizes || "") as string[],
    slug: (input.slug || "") as string,
    sku: (input.sku || "") as string,
    stock: (input.stock || 0) as number,
    status: (input.status || "inactive") as "active" | "inactive",
  };
};
