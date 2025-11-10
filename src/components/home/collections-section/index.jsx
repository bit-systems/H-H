import CollectionCard from "./collection-card";

import styles from "./index.module.scss";

const collections = [
  {
    id: 1,
    image: "/assets/images/checks-shirts.jpg",
    title: "Checks Shirts",
    text: "Checks, Small Lines and Many More",
    url: "/collections/t-shirts",
  },
  {
    id: 2,
    image: "/assets/images/formals-shirts.jpg",
    title: "Formal Shirts",
    text: "Formals & Utility",
    url: "/collections/hoodies-sweatshirts",
  },
  {
    id: 3,
    image: "/assets/images/printed-shirts.jpg",
    title: "Printed Shirts",
    text: "Print, Designs & more",
    url: "/collections/accessories",
  },
];

const CollectionsSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <h2 className={styles.title}>Collections</h2>
        <div className={styles.grid_container}>
          {collections.map((collection, i) => (
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
