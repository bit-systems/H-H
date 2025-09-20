import { useState, useEffect } from "react";

import { useCollection } from "@/hooks/useCollection";
import { getAllProducts } from "@/models/products/product.repository";

import CartModal from "./CartModal";
import CartContent from "./CartContent";

const initialSlides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
];

const Cart = ({ isCartModalOpen, closeCartModal }) => {
  const { getCollection } = useCollection();

  const [slides, setSlides] = useState([]);
  const [fetchedVariants, setFetchedVariants] = useState(null);

  useEffect(() => {
    if (isCartModalOpen && !fetchedVariants) {
      setTimeout(() => {
        (async () => {
          const fetchedVariants = await getAllProducts({
            sortBy: { field: "price", direction: "desc" }, //TODO make dynamic add filters
          });
          console.log("fetchedVariants", fetchedVariants);
          // const sortedVariants = fetchedVariants.sort((a, b) =>
          //   a.color.toUpperCase() > b.color.toUpperCase() ? 1 : -1
          // );
          const mappedProducts = fetchedVariants.map((p) => ({
            ...p,
            slides: p.images,
            variants: p.variants.map((v) => ({
              ...v,
              slides: v.images,
            })),
          }));
          setFetchedVariants(mappedProducts);
          setSlides(mappedProducts);
        })();
      }, 200);
    }

    if (isCartModalOpen && fetchedVariants) {
      setTimeout(() => {
        setSlides(fetchedVariants);
      }, 200);
    }

    if (!isCartModalOpen) {
      setTimeout(() => {
        setSlides([]);
      }, 200);
    }
  }, [isCartModalOpen]);

  return (
    <CartModal close={closeCartModal} slides={slides}>
      {isCartModalOpen && (
        <CartContent closeCartModal={closeCartModal} slides={slides} />
      )}
    </CartModal>
  );
};

export default Cart;
