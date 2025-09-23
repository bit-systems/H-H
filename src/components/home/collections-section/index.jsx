import CollectionCard from "./collection-card";

import styles from "./index.module.scss";

const collections = [
  {
    id: 1,
    image: "/assets/images/collection-remeras-top.jpg",
    title: "t-shirts",
    text: "T-shirts & tank tops",
    url: "/collections/t-shirts",
  },
  {
    id: 2,
    image: "/assets/images/collection-buzos-top.jpg",
    title: "hoodies",
    text: "Hoodies & sweatshirts",
    url: "/collections/hoodies-sweatshirts",
  },
  {
    id: 3,
    image: "/assets/images/collection-accesorios-bottom.jpg",
    title: "accessories",
    text: "Dad hats, bucket hats & more",
    url: "/collections/accessories",
  },
];

const CollectionsSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h2 className={styles.title}>Collections</h2>
        <div className={styles.grid_container}>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              image={collection.image}
              title={collection.title}
              text={collection.text}
              url={collection.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
