import { Product, ProductOutput } from "../products/product.model";
import { VariantOutput } from "../variants/variant.model";
import { getCloudfrontUrl } from "@/utils/utils";

export const mapProductToOutput = (product: Product): ProductOutput => {
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

const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

function sortSizes(sizes: string[]) {
  return sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
}

const variantToOutput = (variant: Product["variants"][0]): VariantOutput => {
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
    sizes: sortSizes(variant.sizes.map((s) => s.size)),
    sizeVariants: variant.sizes,
    slug: variant.slug,
    sku: variant.sku,
    status: variant.status,
    productId: variant.productId,
  };
};
