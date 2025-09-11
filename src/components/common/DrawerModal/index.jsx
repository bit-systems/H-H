import { motion, AnimatePresence } from 'framer-motion';

import { useKeyDown } from '@/hooks/useKeyDown';

import { Backdrop } from '@/components/common';

import styles from './index.module.scss';
import Portal from '../Portal';

const DrawerModal = ({
  children,
  close,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
  motionKey,
}) => {
  useKeyDown(() => {
    close();
  }, ['Escape']);

  const variants = {
    initial: { y: '50vh', opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: '50vh', opacity: 0 },
  };

  return (
    <AnimatePresence>
      {children && (
        <>
         

          <Portal containerId='overlay'>
              <>
              <Backdrop
                backdropClassName={`${styles.backdrop} ${backdropClassName}`}
              />
              <div
                onClick={close}
                className={`${styles.modal_container} ${containerClassName}`}
              >
                <div className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    key={motionKey}
                    variants={variants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className={`${styles.nav_drawer} ${modalClassName}`}
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

export default DrawerModal;
