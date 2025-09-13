interface Variant {
  slug: string; // unique slug for the variant
  color: string; // color code or name (e.g., "red", "#FF0000")
  colorDisplay?: string; // human-readable color name (e.g., "Red")
  images: { id: string; name: string; url?: string }[];
  productId: string; // reference to parent product
  id: string; // unique identifier
  size: string; // size label (e.g., "S", "M", "L", "32", "34")
  price: number; // regular price
  salePrice: number; // discounted price
  sku: string; // stock keeping unit
  stock: number; // available stock quantity
}

export interface Product {
  id: string; // unique identifier
  title: string; // title of the product
  subTitle: string; // subtitle or tagline
  brand: string; // brand name
  description: string; // detailed description
  variantSlugs: string[]; // generated slugs for each variant
  variants: Variant[]; // all product variants
  attributes: Attribute[]; // key-value pairs for additional attributes
  tags: string[]; // searchable tags
  category: string; // product category men, women, kids, etc.
  images: { id: string; name: string; url?: string }[];
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
}

interface Attribute {
  label: string;
  value: string;
}

const ex: Product = {
  id: "prod-001",
  brand: "Levis 501",
  title: "Levis 501",
  category: "Apparel",
  subTitle: "Classic Jeans",
  description: "A classic pair of jeans",
  variantSlugs: ["levis-501-blue", "levis-501-black"],
  tags: ["jeans", "levis", "classic"],
  attributes: [
    { label: "Material", value: "Denim" },
    { label: "Fit", value: "Regular" },
  ],
  images: [
    { id: "1", name: "front-view", url: "http://example.com/front.jpg" },
  ],
  variants: [
    {
      id: "var-001",
      slug: "levis-501-blue",
      color: "blue",
      colorDisplay: "Blue",
      images: [
        { id: "1", name: "front-view", url: "http://example.com/front.jpg" },
      ],
      productId: "prod-001",
      sku: "LEVIS501-BLUE-32",
      size: "32",
      price: 59.99,
      salePrice: 49.99,
      stock: 100,
    },
    {
      id: "var-001",
      slug: "levis-501-black",
      color: "black",
      colorDisplay: "Black",
      images: [
        {
          id: "2",
          name: "front-view",
          url: "http://example.com/front-black.jpg",
        },
      ],
      productId: "prod-001",
      sku: "LEVIS501-BLACK-32",
      size: "32",
      price: 59.99,
      salePrice: 49.99,
      stock: 50,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: "active",
};
