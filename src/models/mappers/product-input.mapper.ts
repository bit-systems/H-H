/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../products/product.model";
import { Variant } from "../variants/variant.model";

export const mapInputToProduct = (input: Record<string, unknown>): Product => {
  return {
    id: (input.id || "") as string,
    title: (input.title || "") as string,
    subTitle: (input.subTitle || "") as string,
    attributes: ((input.attributes || []) as Product["attributes"]).map(
      (attr) => ({
        label: attr.label,
        value: attr.value,
      })
    ),
    brand: (input.brand || "") as string,
    description: (input.description || "") as string,
    category: "men" as string,
    createdAt: (input.createdAt as string) ?? new Date().toISOString(),
    images: ((input.images || []) as Product["images"]).map((img) => ({
      id: img.id,
      key: img.key,
      name: img.name,
    })),
    productCategory: "Top Wear" as string,
    productType: "Shirt" as string,
    status: (input.status || "draft") as "active" | "inactive" | "draft",
    tags: (input.tags || []) as string[],
    updatedAt: new Date().toISOString(),
    variantSlugs: (input.variantSlugs || []) as string[],
    variants:
      ((input?.variants ?? []) as any[])?.map((v) =>
        mapVariantInputToVariant(v)
      ) || [],
  };
};

export const mapVariantInputToVariant = (input: any): Variant => {
  return {
    id: (input.id || "") as string,
    color: (input.color || "") as string,
    colorDisplay: (input.colorDisplay || "") as string,
    images: (input.images || ([] as Variant["images"])).map(
      (img: Variant["images"][0]) => ({
        id: img.id,
        key: img.key,
        name: img.name,
      })
    ),
    price: (input.price || 0) as number,
    salePrice: (input.salePrice || 0) as number,
    sizes: input.sizes.flatMap((size: any) => ({
      size: Object.keys(size)[0],
      quantity: size[Object.keys(size)[0]] as number,
    })),
    slug: (input.slug || "") as string,
    sku: (input.sku || "") as string,
    status: (input.status || "inactive") as "active" | "inactive",
  };
};
