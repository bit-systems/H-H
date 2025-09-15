import { Product } from "../products/product.model";
import { Variant } from "../variants/variant.model";
import { getCloudfrontUrl } from "@/utils/utils";

export const mapProductToOutput = (product: Product): Product => {
  return {
    id: product.id,
    attributes: product.attributes,
    brand: product.brand,
    category: product.category,
    createdAt: product.createdAt,
    description: product.description,
    images: product.images.map((img) => ({
      id: img.id,
      key: img.key,
      name: img.name,
      src: getCloudfrontUrl(img.key),
    })),
    productCategory: product.productCategory,
    productType: product.productType,
    status: product.status,
    subTitle: product.subTitle,
    tags: product.tags,
    title: product.title,
    updatedAt: product.updatedAt,
    variantSlugs: product.variantSlugs,
    variants: product.variants.map((v) => variantToOutput(v)),
  };
};

const variantToOutput = (variant: Product["variants"][0]): Variant => {
  return {
    id: variant.id,
    color: variant.color,
    colorDisplay: variant.colorDisplay,
    images: variant.images.map((img) => ({
      id: img.id,
      key: img.key,
      name: img.name,
      src: getCloudfrontUrl(img.key),
    })),
    price: variant.price,
    salePrice: variant.salePrice,
    sizes: variant.sizes,
    slug: variant.slug,
    sku: variant.sku,
    status: variant.status,
    productId: variant.productId,
  };
};
