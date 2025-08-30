import { createPortal } from 'react-dom';

import Backdrop from '../Backdrop';
import MediaContainer from '../MediaContainer';

import styles from './index.module.scss';

// import LoaderImage from '/assets/images/loader.png';

const Loader = ({
  noPortal,
  backdropClassName,
  containerClassName,
  loaderClassName,
}) => {
// const overlayElement = document.getElementById('overlay'); //TODO fix this for nextjs
  const overlayElement = <p>Fix it</p>
  if (noPortal) {
    return (
      <>
        <div className={`${styles.loader_np_container} ${containerClassName}`}>
          <MediaContainer
            image={LoaderImage}
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
      {createPortal(
        <>
          <Backdrop
            backdropClassName={`${styles.backdrop} ${backdropClassName}`}
          />
          <div className={`${styles.loader_container} ${containerClassName}`}>
            <MediaContainer
              image={'/assets/images/loader.png'}
              alt=""
              containerClassName={styles.image_container}
              fillClassName={styles.image_fill}
              mediaClassName={`${styles.image} ${loaderClassName}`}
            />
          </div>
        </>,
        overlayElement
      )}
    </>
  );
};

export default Loader;
