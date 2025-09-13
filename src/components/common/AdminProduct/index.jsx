import { useState, useEffect } from "react";

import { v4 as uuid } from "uuid";

import { useAdmin } from "@/hooks/useAdmin";
import { postApi } from "@/fetch-api/fetch-api";

import ProductForm from "./ProductForm";

import { Button, Loader, CenterModal, ConfirmModal } from "@/components/common";

import styles from "./index.module.scss";
import { useRouter } from "next/router";

const AdminProduct = ({
  isEditPage,
  currentInventoryLevels,
  productId,
  productImages,
  productModel,
  productType,
  productCollection,
  productDescription,
  productBaseSku,
  productSizesInput,
  productVariants,
}) => {
  const navigate = useRouter();
  const [navigation, setNavigation] = useState(false);

  const {
    uploadFiles,
    deleteFile,
    createProduct,
    editProduct,
    deleteProduct,
    isLoading,
    error,
  } = useAdmin();

  const [images, setImages] = useState(productImages || []);

  const [productInput, setProductInput] = useState({
    model: productModel || "",
    type: productType || "",
    collection: productCollection || "",
    description: productDescription || "",
    tags: "",
    sku: productBaseSku || "",
    sizes: productSizesInput || {
      s: false,
      m: false,
      l: false,
      xl: false,
      xxl: false,
    },
  });

  const [variants, setVariants] = useState(productVariants || []);

  const [isEditingVariants, setIsEditingVariants] = useState(false);
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    if (editCount === 0) {
      setIsEditingVariants(false);
    } else {
      setIsEditingVariants(true);
    }
  }, [editCount]);

  const [imagesMarkedForRemoval, setImagesMarkedForRemoval] = useState([]);

  const handleImagesInput = async (e) => {
    let inputFiles;

    e.dataTransfer
      ? (inputFiles = e.dataTransfer.files)
      : (inputFiles = e.target.files);

    if (inputFiles.length > 0) {
      //TODO upload files to cloudinary
      // const updatedImages = await uploadFiles("product-images", {
      //   currentFiles: [...images],
      //   newFiles: [...inputFiles],
      // });

      const formData = new FormData();
      formData.append("file", inputFiles[0]);

      const resp = await postApi("/api/media", formData, {});
      console.log(inputFiles[0], "inputFiles");
      console.log(resp, "resp");
      const updatedImages = [...inputFiles].map((file) => ({
        id: uuid(),
        name: file.name,
        key: resp.key,
        src: URL.createObjectURL(file),
        file,
      }));

      setImages((prevState) => [...prevState, ...updatedImages]);
    }
  };

  const handleDeleteImage = (fileName) => {
    const updatedImages = images.filter((image) => image.name !== fileName);
    const imageMarkedForRemoval = images.find(
      (image) => image.name === fileName
    );

    if (!isEditPage) {
      deleteFile("product-images", imageMarkedForRemoval);
    } else {
      const updatedImagesMarkedForRemoval = [...imagesMarkedForRemoval];
      updatedImagesMarkedForRemoval.push(imageMarkedForRemoval);
      setImagesMarkedForRemoval(updatedImagesMarkedForRemoval);
    }

    const updatedVariants = [...variants];

    for (const variant of updatedVariants) {
      variant.images = variant.images.filter((image) => image !== fileName);
    }

    setImages(updatedImages);
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    const updatedVariants = [...variants];

    updatedVariants.push({
      id: uuid(),
      color: "",
      colorDisplay: "",
      currentPrice: 0,
      actualPrice: 0,
      images: [],
      inventory: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
    });

    setVariants(updatedVariants);
  };

  const handleEditVariantCount = (num) => {
    setEditCount((prevState) => prevState + num);
  };

  const handleDeleteVariant = (index) => {
    const updatedVariants = [...variants];

    updatedVariants.splice(index, 1);

    setVariants(updatedVariants);
  };

  const handleVariantEditSubmit = ({ variantIndex, ...updatedVariant }) => {
    const updatedVariants = [...variants];

    updatedVariants[variantIndex] = updatedVariant;

    setVariants(updatedVariants);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    let productData = { ...productInput };
    productData.sizes = sizes;
    productData.tags = tags;

    if (isEditPage) {
      productData.id = productId;
      await editProduct({
        productData,
        variants,
        currentInventoryLevels,
        images,
        imagesMarkedForRemoval,
      });
    } else {
      await createProduct({ productData, variants, images });
    }

    setNavigation(true);
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate.push("/admin/products");
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteOnConfirm = async () => {
    setIsConfirmOpen(false);
    await deleteProduct(productId);
    setNavigation(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
  };

  const createButtonIsDisabled = false;

  let createButtonContent;

  // if (isEditingVariants) {
  //   createButtonContent = `Editing...`;
  // } else if (sizes.length === 0) {
  //   createButtonContent = `No sizes selected`;
  // } else if (variants.length === 0) {
  //   createButtonContent = `No variants selected`;
  // } else {
  if (isEditPage) {
    createButtonContent = `Update`;
  } else {
    createButtonContent = `Create`;
  }
  // }

  return (
    <>
      <CenterModal
        toggleModal={closeConfirm}
        modalClassName={styles.confirm_modal}
      >
        {isConfirmOpen && (
          <ConfirmModal
            text="Are you sure you want to delete this product? There is no way to undo this."
            handleConfirm={handleDeleteOnConfirm}
          />
        )}
      </CenterModal>
      {isLoading && <Loader />}
      <section>
        <div className={`${styles.container} main-container`}>
          <h1>{isEditPage ? "Edit" : "Add"} Product</h1>
          <ProductForm
            isEditPage={isEditPage}
            productInput={productInput}
            images={images}
            handleImagesInput={handleImagesInput}
            handleDeleteImage={handleDeleteImage}
            handleProductSubmit={handleProductSubmit}
          />
          {/* <Variants
            productInput={productInput}
            variants={variants}
            images={images}
            handleAddVariant={handleAddVariant}
            handleEditVariantCount={handleEditVariantCount}
            handleDeleteVariant={handleDeleteVariant}
            handleVariantEditSubmit={handleVariantEditSubmit}
          /> */}
          <div className={styles.buttons_wrapper}>
            <Button
              type="submit"
              form="productForm"
              disabled={createButtonIsDisabled}
              className={styles.submit}
            >
              {createButtonContent}
            </Button>
            {isEditPage && (
              <Button
                onClick={() => setIsConfirmOpen(true)}
                type="button"
                className={styles.delete}
              >
                Delete Product
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProduct;
