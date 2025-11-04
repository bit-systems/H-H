import { useState, useEffect, useRef, useCallback } from "react";

import { FaRedoAlt } from "react-icons/fa";

import { useCollectionV2 } from "@/hooks/useCollectionV2";

import ProductFilter from "@/components/collection/product-filter";

import { ProductCardV2, Loader } from "@/components/common";

import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

const validSlugs = [
  "products",
  "t-shirts",
  "hoodies-sweatshirts",
  "accessories",
  "shirts",
];

const CollectionPage = () => {
  const navigate = useRouter();
  const { id: slugId } = navigate.query;

  const { getCollection, isLoading, hasMore, error } = useCollectionV2();

  const newSlug = useRef(true);
  const [productVariants, setProductVariants] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [filterConditions, setFilterConditions] = useState({});
  const [sortBy, setSortBy] = useState({
    field: "createdAt",
    direction: "asc",
    description: "newest",
  });
  const [filtering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (!navigate.isReady) return;
    console.log("slugId", slugId);
    setProductVariants(null);
    setFilteredProducts(null);
    setFilterConditions({});
    if (!newSlug.current) {
      newSlug.current = true;
      setSortBy({
        field: "createdAt",
        direction: "asc",
        description: "newest",
      });
    }

    if (!validSlugs.includes(slugId)) {
      // navigate.push("/");
    }

    const fetchProductVariants = async () => {
      const productVariants = await getCollection({
        collectionName: slugId,
      });
      console.log("productVariants", productVariants);
      setProductVariants(productVariants);
    };

    fetchProductVariants();
  }, [, navigate.isReady]);

  useEffect(() => {
    if (!navigate.isReady) return;
    if (newSlug.current) {
      newSlug.current = false;
      return;
    }

    window.scrollTo(0, 0);

    setFilteredProducts(null);
    (async () => {
      const productVariants = await getCollection({
        collectionName: slugId,
        sortBy,
      });

      console.log("productVariants", productVariants);

      setProductVariants(productVariants);
    })();
  }, [sortBy, navigate.isReady]);

  const observer = useRef();
  const lastProductVariantRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          const moreProductVariants = await getCollection({
            collectionName: slugId,
            isNewQuery: false,
            sortBy,
          });

          setProductVariants((prevState) => {
            if (!prevState) {
              return prevState;
            } else {
              return [...prevState, ...moreProductVariants];
            }
          });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  const handleFilter = (filteredProducts) => {
    setTimeout(() => {
      setFilteredProducts(filteredProducts);
      setIsFiltering(false);
    }, 100);
  };

  const handleUpdateFilterConditions = (value) => {
    setIsFiltering(true);
    setFilteredProducts([]);
    setFilterConditions(value);
  };

  const handleSortBy = (description) => {
    if (description === "newest") {
      setSortBy({
        field: "createdAt",
        direction: "asc",
        description,
      });
    } else if (description === "price: low-high") {
      setSortBy({
        field: "price",
        direction: "asc",
        description,
      });
    } else if (description === "price: high-low") {
      setSortBy({
        field: "price",
        direction: "desc",
        description,
      });
    }
  };

  return (
    <>
      <section className={styles.section}>
        {(!productVariants || !filteredProducts) && (
          <Loader backdropClassName={styles.backdrop} />
        )}

        {productVariants && (
          <>
            {filteredProducts && (
              <div className="main-container">
                <div className={styles.container}>
                  {filteredProducts.length === 0 &&
                    !isLoading &&
                    !filtering && (
                      <>
                        <p className={styles.less_filters_title}>
                          Sorry, no products matched your selection {`:(`}
                        </p>
                        <p className={styles.less_filters_subtitle}>
                          Use fewer filters or
                        </p>
                        <div
                          onClick={() => handleUpdateFilterConditions({})}
                          className={styles.clear_all}
                        >
                          <span>Clear all</span>
                          <FaRedoAlt />
                        </div>
                      </>
                    )}
                  <div className={styles.grid_container}>
                    {filteredProducts.map((product, index) => (
                      <div
                        id={product.id}
                        key={product.id}
                        ref={
                          index + 1 === filteredProducts.length
                            ? lastProductVariantRef
                            : undefined
                        }
                        className={styles.product_card_container}
                      >
                        <ProductCardV2
                          productId={product.productId}
                          variantId={product.variants[0].id}
                          model={product.title}
                          color={product.variants[0].color}
                          type={product.brand}
                          numberOfVariants={product.variants.length}
                          allVariants={product.variants}
                          product={product}
                          discount={product.discount}
                          currentPrice={product.price}
                          actualPrice={product.actualPrice}
                          slides={product.slides}
                          images={product.images}
                          skus={product.variants}
                          isSoldOut={false} // TODO fix this
                        />
                      </div>
                    ))}
                  </div>
                  {isLoading && (
                    <div className={styles.loading_more}>Loading</div>
                  )}
                </div>
              </div>
            )}
            <ProductFilter
              allProducts={productVariants}
              filterConditions={filterConditions}
              sortByDescription={sortBy.description}
              handleFilter={handleFilter}
              handleSortBy={handleSortBy}
              handleUpdateFilterConditions={handleUpdateFilterConditions}
            />
          </>
        )}
      </section>
    </>
  );
};

export default CollectionPage;
