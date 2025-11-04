"use client";
import { motion, AnimatePresence } from "framer-motion";

import { useKeyDown } from "@/hooks/useKeyDown";

import { Backdrop, Button } from "@/components/common";

import styles from "./index.module.scss";
import Portal from "../Portal";

const ConfirmModal = ({
  show,
  close,
  handleConfirm,
  title,
  text,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
  confirmBtnText,
  cancelBtnText,
}) => {
  useKeyDown(() => {
    close();
  }, ["Escape"]);

  const variants = {
    initial: { y: "50vh", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "50vh", opacity: 0 },
  };
  return (
    <>
      <AnimatePresence>
        {show && (
          <>
            <Portal containerId="overlay">
              <>
                <Backdrop
                  backdropClassName={`${styles.backdrop} ${backdropClassName}`}
                />
                <div
                  onClick={close}
                  className={`${styles.modal_container} ${containerClassName}`}
                >
                  <div
                    className={`${styles.modal_wrapper} ${wrapperClassName}`}
                  >
                    <motion.div
                      onClick={(e) => e.stopPropagation()}
                      key="confirm-modal"
                      variants={variants}
                      initial="initial"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className={`${styles.confirm_modal} ${modalClassName}`}
                    >
                      <p className={styles.title}>{title}</p>
                      <p className={styles.text}>{text}</p>
                      <div className={styles.controls_wrapper}>
                        <Button
                          onClick={handleConfirm}
                          type="button"
                          className={styles.button}
                        >
                          {confirmBtnText ?? "Confirm"}
                        </Button>
                        <Button
                          onClick={close}
                          type="button"
                          className={styles.error_button}
                        >
                          {cancelBtnText ?? "Cancel"}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </>
            </Portal>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConfirmModal;
