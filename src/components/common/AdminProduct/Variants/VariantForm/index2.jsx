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
import { useForm } from "react-hook-form";

const VariantFormV2 = ({
  productInput,
  variant,
  variantIndex,
  images,
  handleDeleteVariant,
  register,
  setValue,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [sizes, setSizes] = useState(variant?.sizes || []);

  useEffect(() => {
    console.log(variant?.images, "uu");

    setSelectedImages(variant?.images ?? []); // during edit fill them from input
  }, [variant?.images]);

  const handleEditStart = () => {
    setIsEditing(true);
    // handleEditVariantCount(1);
  };

  const handleEditCancel = () => {
    // const { inventory, images, ...details } = variant;
    // setSelectedImages([]);
    // setDetailsInput(details);
    // setInventoryInput(inventory);
    setIsEditing(false);
    // handleEditVariantCount(-1);
  };

  const handleDeleteOnConfirm = () => {
    handleDeleteVariant(variantIndex);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const updateItem = () => {
    console.log(sizes, "ss");
    console.log({ ...variant, images: selectedImages, sizes });
    setValue(`variants.${variantIndex}.sizes`, sizes);
    setValue(`variants.${variantIndex}.images`, selectedImages);
    setIsEditing(false);
  };

  const handleImageConfirm = (currentImagesName) => {
    const newImages = [...selectedImages];

    for (const currentImageName of currentImagesName) {
      newImages.push(images.find((image) => image.name === currentImageName));
    }

    setSelectedImages(newImages);
  };

  const closeImageSelector = () => {
    setIsSelectorOpen(false);
  };

  let variantTitle = `Variant ${variantIndex + 1}`;

  let controlsContainerEditingStyles = isEditing
    ? styles.controls_container_editing
    : "";

  let tableWrapperEditingStyles = isEditing ? styles.table_wrapper_editing : "";
  console.log(selectedImages, "selected images");
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
      <div className={styles.form_container}>
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
                <Button
                  onClick={updateItem}
                  className={styles.submit}
                  type="button"
                >
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
                          Color of the product. Example: #FFFFFF, #000000,
                          #FF5733.
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
                          Color to be displayed. Example: White, Off-White,
                          Light Blue.
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
                          Actual sale price. If no sale, put the same as current
                          price.
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
                              checked={sizes.includes(key)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSizes((s) => [...s, key]);
                                } else {
                                  setSizes((s) =>
                                    s.filter((size) => size !== key)
                                  );
                                }
                              }}
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
                            {...register(`variants.${variantIndex}.color`, {
                              required: false,
                            })}
                          />
                        </>
                      }
                    </td>
                    <td className={styles.color_d_td}>
                      {
                        <input
                          type="text"
                          {...register(
                            `variants.${variantIndex}.displayColor`,
                            {
                              required: false,
                            }
                          )}
                        />
                      }
                    </td>
                    <td className={styles.price_td}>
                      {
                        <input
                          type="number"
                          {...register(`variants.${variantIndex}.price`, {
                            required: false,
                          })}
                        />
                      }
                    </td>
                    <td className={styles.price_td}>
                      {
                        <input
                          type="number"
                          {...register(`variants.${variantIndex}.salePrice`, {
                            required: false,
                          })}
                        />
                      }
                    </td>
                    <td className={styles.inventory_td}>
                      <input
                        type="number"
                        {...register(`variants.${variantIndex}.stock`, {
                          required: false,
                        })}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default VariantFormV2;
