import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";

import { formatDiscountNumber } from "@/helpers/format";
import { getProductsByQuery } from "@/models/products/product.repository";

export const useCollectionV2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const latestDoc = useRef();

  const getCollection = async ({
    collectionName = "Product",
    isNewQuery = true,
    sortBy = { field: "createdAt", direction: "desc" },
  } = {}) => {
    const limitList = 10;
    setError(null);
    setIsLoading(true);

    try {
      if (isNewQuery) {
        latestDoc.current = 0;
        setHasMore(true);
      }

      let constraints = [
        orderBy(sortBy.field, sortBy.direction),
        where("status", "==", "active"),
      ];

      // if (sortBy.field === "createdAt") {
      //   constraints.unshift(orderBy("createdAt", "desc"));
      // }

      if (sortBy.direction === "desc" && !latestDoc.current) {
        constraints.push(limit(limitList));
      } else {
        constraints.push(
          startAfter(isNewQuery ? 0 : latestDoc.current),
          limit(limitList)
        );
      }

      const productsResult = await getProductsByQuery(constraints);

      console.log("productsResult", productsResult);

      if (productsResult.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return [];
      }

      latestDoc.current = productsResult[productsResult.length - 1];

      const productPerVariant = [];

      productsResult.forEach((p) => {
        p.variants.forEach((v, i) => {
          const sizeVariants = {};
          v.sizeVariants.forEach((sv) => {
            if (sv.quantity > 0) {
              sizeVariants[sv.size] = sv.quantity;
            }
          });

          productPerVariant.push({
            ...p,
            slides: p.images,
            variants: [
              { ...v, slides: v.images },
              ...p.variants
                .filter((pv, i) => pv.id !== v.id)
                .map((pv) => ({
                  ...pv,
                  slides: pv.images,
                })),
            ],
            discount: formatDiscountNumber({
              currentPrice: p.variants[i].salePrice,
              actualPrice: p.variants[i].price,
            }),
            price: p.variants[i].price,
            actualPrice: p.variants[i].salePrice,
            id: p.id || uuid(),
            slides: v.images,
            isSoldOut: false,
            availableQuantity: sizeVariants,
          });
        });
      });

      setIsLoading(false);
      return [].concat(...productPerVariant);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, hasMore, error };
};
