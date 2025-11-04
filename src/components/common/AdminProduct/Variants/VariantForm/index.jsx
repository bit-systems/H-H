"use client";
import { useState, useEffect } from "react";

import { FaQuestionCircle } from "react-icons/fa";

import ImageSelect from "./ImageSelect";

import {
  Button,
  ToolTip,
  CenterModal,
  ConfirmModal,
} from "@/components/common";

import styles from "./index.module.scss";

const VariantForm = ({
  productInput,
  variant,
  variantIndex,
  images,
  handleEditVariantCount,
  handleDeleteVariant,
  handleVariantEditSubmit,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [detailsInput, setDetailsInput] = useState({
    color: variant.color,
    colorDisplay: variant.colorDisplay,
    currentPrice: variant.currentPrice,
    actualPrice: variant.actualPrice,
  });

  const [inventoryInput, setInventoryInput] = useState(variant.inventory);
  const [variantTitleInventory, setVariantTitleInventory] = useState("");

  const [selectedImages, setSelectedImages] = useState(variant.images);

  useEffect(() => {
    const availableImageNames = images.map((image) => image.name);
    const updatedSelectedImages = selectedImages.filter((selectedImage) =>
      availableImageNames.includes(selectedImage.name)
    );

    setSelectedImages(updatedSelectedImages);
  }, [images]);

  const handleEditStart = () => {
    setIsEditing(true);
    handleEditVariantCount(1);
  };

  const handleEditCancel = () => {
    const { inventory, images, ...details } = variant;
    setSelectedImages(images);
    setDetailsInput(details);
    setInventoryInput(inventory);
    setIsEditing(false);
    handleEditVariantCount(-1);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (detailsInput.currentPrice > detailsInput.actualPrice) {
      // TODO: Add error
      return;
    }
    handleVariantEditSubmit({
      variantIndex,
      id: variant.id,
      color: detailsInput.color.toLowerCase(),
      colorDisplay: detailsInput.colorDisplay.toLowerCase(),
      currentPrice: +detailsInput.currentPrice,
      actualPrice: +detailsInput.actualPrice,
      inventory: inventoryInput,
      images: [...selectedImages],
    });
    setIsEditing(false);
    handleEditVariantCount(-1);
  };

  const handleDeleteOnConfirm = () => {
    handleDeleteVariant(variantIndex);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleImageConfirm = (currentImagesName) => {
    const selectedImages = [];

    for (const currentImageName of currentImagesName) {
      selectedImages.push(
        images.find((image) => image.name === currentImageName)
      );
    }

    setSelectedImages(selectedImages);
  };

  const closeImageSelector = () => {
    setIsSelectorOpen(false);
  };

  let variantTitleColor = variant.colorDisplay
    ? variant.colorDisplay
    : variant.color;

  let variantTitle = `Variant ${variantIndex + 1}: ${productInput.type} ${
    productInput.model
  } ${variantTitleColor} ${variantTitleInventory}`;

  let controlsContainerEditingStyles = isEditing
    ? styles.controls_container_editing
    : "";

  let tableWrapperEditingStyles = isEditing ? styles.table_wrapper_editing : "";

  return (
    <>
      <CenterModal close={closeConfirm} modalClassName={styles.confirm_modal}>
        {isConfirmOpen && (
          <ConfirmModal
            show={true}
            isConfirmOpen={isConfirmOpen}
            handleConfirm={handleDeleteOnConfirm}
            close={closeConfirm}
            text="Are you sure you want to delete this variant?"
          />
        )}
      </CenterModal>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={closeImageSelector}
      >
        {isSelectorOpen && (
          <ImageSelect
            images={images}
            currentlySelectedImages={selectedImages}
            variantIndex={variantIndex}
            handleImageConfirm={handleImageConfirm}
            closeImageSelector={closeImageSelector}
          />
        )}
      </CenterModal>
      <form onSubmit={handleEditSubmit} className={styles.form_container}>
        <div
          className={`${styles.controls_container} ${controlsContainerEditingStyles}`}
        >
          {selectedImages.length === 0 && (
            <div className={styles.no_image}></div>
          )}
          {selectedImages.length > 0 && (
            <div className={styles.image_wrapper}>
              <img src={selectedImages[0].src} alt="" />
              <div>{selectedImages.length}</div>
            </div>
          )}
          <p className={styles.variant_title}>{variantTitle}</p>
          <div className={styles.buttons_wrapper}>
            {isEditing && (
              <>
                <Button className={styles.submit} type="submit">
                  Submit
                </Button>
                <Button
                  className={styles.cancel}
                  onClick={handleEditCancel}
                  type="button"
                >
                  Cancel
                </Button>
              </>
            )}
            {!isEditing && (
              <>
                <Button
                  className={styles.edit}
                  type="button"
                  onClick={handleEditStart}
                >
                  Edit
                </Button>
                <Button
                  className={styles.delete}
                  type="button"
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
        {isEditing && (
          <div
            className={`${styles.table_wrapper} ${tableWrapperEditingStyles}`}
          >
            {/* {sizes.length === 0 && (
              <p className={styles.no_sizes}>Please choose sizes.</p>
            )} */}
            {
              <table>
                <thead>
                  <tr>
                    <th>
                      <span className={styles.table_header}>Sizes</span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Images</span>
                    </th>
                    <th>
                      <span className={styles.color_header}>
                        Color
                        <ToolTip className={styles.tooltip}>
                          Escribir color masculino. Ejemplo: blanco sí, blanca
                          no.
                        </ToolTip>
                        <i>
                          <FaQuestionCircle />
                        </i>
                      </span>
                    </th>
                    <th>
                      <span className={styles.color_header}>
                        Color Display
                        <ToolTip className={styles.tooltip}>
                          Escribir color con género gramatical correcto según el
                          tipo de producto. Ejemplo: remera y blanco, escribir
                          blanca.
                        </ToolTip>
                        <i>
                          <FaQuestionCircle />
                        </i>
                      </span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Current Price</span>
                    </th>
                    <th>
                      <span className={styles.actual_price_header}>
                        Actual Price{" "}
                        <ToolTip className={styles.tooltip}>
                          Un "current price" menor al "actual" muestra al
                          product "ON SALE". Se calcula automaticamente el
                          porcentaje de descuento.
                        </ToolTip>
                        <i>
                          <FaQuestionCircle />
                        </i>
                      </span>
                    </th>
                    <th>
                      <span className={styles.table_header}>Inventory</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.size_td}>
                      <div className={styles.checkbox_wrapper}>
                        {["S", "M", "L", "XL"].map((key) => (
                          <label key={key}>
                            <input
                              type="checkbox"
                              value={key}
                              // checked={productInput.sizes[key]}
                              // onChange={handleSizesInput}
                            />
                            <span>{key.toUpperCase()}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className={styles.images_td}>
                      {
                        // <ul className={styles.image_links}>
                        //   {images.map((image) => (
                        //     <li className={styles.image_link}>
                        //       <input
                        //         type="checkbox"
                        //         key={image.name}
                        //         value={image.name}
                        //       />
                        //       <div>
                        //         <label htmlFor={image.name}>{image.name}</label>
                        //       </div>
                        //     </li>
                        //   ))}
                        // </ul>
                        <div className={styles.images_button_wrapper}>
                          {images.length === 0 && <p>No Images Uploaded</p>}
                          {images.length > 0 && (
                            <>
                              {selectedImages.length === 0 && (
                                <p>No files selected</p>
                              )}
                              {selectedImages.length > 0 && (
                                <p>{`${selectedImages.length} File${
                                  selectedImages.length > 1 ? "s" : ""
                                } selected`}</p>
                              )}
                              <div>
                                <Button
                                  onClick={() => setIsSelectorOpen(true)}
                                  className={styles.images_button}
                                  type="button"
                                >
                                  Select
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      }
                    </td>
                    <td className={styles.color_td}>
                      {
                        <>
                          <input
                            type="text"
                            value={detailsInput.color}
                            onChange={(e) =>
                              setDetailsInput((prevState) => ({
                                ...prevState,
                                color: e.target.value,
                              }))
                            }
                            disabled={!isEditing}
                            required
                          />
                        </>
                      }
                    </td>
                    <td className={styles.color_d_td}>
                      {
                        <input
                          type="text"
                          value={detailsInput.colorDisplay}
                          onChange={(e) =>
                            setDetailsInput((prevState) => ({
                              ...prevState,
                              colorDisplay: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      }
                    </td>
                    <td className={styles.price_td}>
                      {
                        <input
                          type="number"
                          value={detailsInput.currentPrice.toString()}
                          onChange={(e) =>
                            setDetailsInput((prevState) => ({
                              ...prevState,
                              currentPrice: +e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          required
                        />
                      }
                    </td>
                    <td className={styles.price_td}>
                      {
                        <input
                          type="number"
                          value={detailsInput.actualPrice.toString()}
                          onChange={(e) =>
                            setDetailsInput((prevState) => ({
                              ...prevState,
                              actualPrice: +e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                          required
                        />
                      }
                    </td>
                    <td className={styles.inventory_td}>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={"0"}
                        onChange={(e) =>
                          setInventoryInput((prevState) => ({
                            ...prevState,
                          }))
                        }
                        disabled={!isEditing}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        )}
      </form>
    </>
  );
};

export default VariantForm;
