
import { motion, AnimatePresence } from 'framer-motion';

import { useKeyDown } from '@/hooks/useKeyDown';

import Backdrop from '../Backdrop';

import styles from './index.module.scss';
import Portal from '../Portal';

// TODO: use this component
const Modal = ({
  children,
  close,
  key,
  variants,
  transition,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
}) => {
  useKeyDown(() => {
    close();
  }, ['Escape']);

  const overlayElement = <p>Fix it</p>
  return (
    <AnimatePresence>
      {children && (
        <>
        

          <Portal containerId='overlay'>
  <>
              <Backdrop backdropClassName={backdropClassName} />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName}`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    key={key}
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={transition}
                    className={`${styles.modal} ${modalClassName}`}
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </>

          </Portal>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
