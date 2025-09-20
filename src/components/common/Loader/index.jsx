"use client";

import Backdrop from "../Backdrop";
import MediaContainer from "../MediaContainer";

import styles from "./index.module.scss";
import Portal from "@/components/common/Portal";

const Loader = ({
  noPortal,
  backdropClassName,
  containerClassName,
  loaderClassName,
}) => {
  if (noPortal) {
    return (
      <>
        <div className={`${styles.loader_np_container} ${containerClassName}`}>
          <MediaContainer
            image={"/assets/images/loader.png"}
            alt=""
            containerClassName={styles.image_container}
            fillClassName={styles.image_fill}
            mediaClassName={`${styles.image} ${loaderClassName}`}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Portal containerId="overlay">
        <>
          <Backdrop
            backdropClassName={`${styles.backdrop} ${backdropClassName}`}
          />
          <div className={`${styles.loader_container} ${containerClassName}`}>
            <MediaContainer
              image={"/assets/images/loader.png"}
              alt=""
              containerClassName={styles.image_container}
              fillClassName={styles.image_fill}
              mediaClassName={`${styles.image} ${loaderClassName}`}
            />
          </div>
        </>
      </Portal>
    </>
  );
};

export default Loader;
