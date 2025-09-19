import { Variant, VariantOutput } from "../variants/variant.model";

export interface ProductModel {
  id: string; // unique identifier
  title: string; // title of the product
  subTitle: string; // subtitle or tagline
  brand: string; // brand name
  description: string; // detailed description
  variantSlugs: string[]; // generated slugs for each variant
  category: string; // product category men, women, kids, etc. not needed
  images: { id: string; name: string; key: string; src?: string }[];
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
  tags: string[]; // searchable tags
  attributes: Attribute[];
  productCategory: string; // e.g., "Top wear", "Bottom wear"
  productType: string; // e.g., "Shirt", "Laptop"
}

interface Attribute {
  label: string;
  value: string;
}

export type Product = ProductModel & { variants: Variant[] };

export type ProductOutput = ProductModel & { variants: VariantOutput[] };
