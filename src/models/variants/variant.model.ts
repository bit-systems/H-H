export interface Variant {
  slug: string; // unique slug for the variant
  color: string; // color code or name (e.g., "red", "#FF0000")
  colorDisplay?: string; // human-readable color name (e.g., "Red")
  images: { id: string; name: string; key: string; src?: string }[];
  productId?: string; // reference to parent product
  id: string; // unique identifier
  sizes: string[]; // size label (e.g., "S", "M", "L", "32", "34")
  price: number; // regular price
  salePrice: number; // discounted price
  sku: string; // stock keeping unit
  stock: number; // available stock quantity
  status: "active" | "inactive";
}
