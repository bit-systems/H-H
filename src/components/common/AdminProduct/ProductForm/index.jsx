import { DragDropFileInput, TagsInput } from "@/components/common";
import { useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./index.module.scss";
import AttributesForm from "../attributes-form/indxe";
import Variants from "../Variants/index copy";
import { createProduct } from "@/models/products/product.repository";
import { mapInputToProduct } from "@/models/mappers/product-input.mapper";
const ProductForm = ({
  isEditPage,
  images,
  productInput,
  handleImagesInput,
  handleDeleteImage,
  handleProductSubmit,
}) => {
  // s

  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState();

  const handleTagsInput = (e) => {
    if (e.key === ",") {
      const val = e.target.value.split(",")[0].toLowerCase();
      const checkForExistingTag = tags.find((tag) => tag === val);

      if (checkForExistingTag) {
        setTagValue("");
        return;
      }

      const updatedTags = tags;
      updatedTags.push(val);
      setTags(() => [...updatedTags]);
      setTagValue("");
      return;
    }
    setTagValue(e.target.value);
  };

  const handleDeleteTags = (tag, i) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(() => [...updatedTags]);
  };

  const { register, handleSubmit, control, setValue } = useForm();
  const onSubmit = (data) => createProduct(mapInputToProduct(data));
  return (
    <>
      <div className={styles.form_wrapper}>
        <form
          id="productForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <div className={styles.images_wrapper}>
            <label htmlFor="file" className={styles.label}>
              <span>All images:</span>
            </label>
            <DragDropFileInput
              name="file"
              title="images"
              type="image"
              files={images}
              accept="image/*"
              handleFileInput={handleImagesInput}
              handleDeleteFile={handleDeleteImage}
              needsConfirmOnDelete={true}
              additionalConfirmText={
                isEditPage
                  ? "These changes will only be saved if you click on update button at the end of form!"
                  : "File will be deleted once you press confirm!"
              }
              previewImages={true}
            />
          </div>
          <label className={styles.label}>
            <span>Title:</span>

            <input type="text" {...register("title", { required: true })} />
          </label>
          <label className={styles.label}>
            <span>Sub Title:</span>
            <input type="text" {...register("subTitle", { required: true })} />
          </label>

          <label className={styles.label}>
            <span>Brand:</span>
            <input type="text" {...register("brand", { required: true })} />
          </label>

          <label className={styles.label}>
            <span>Description:</span>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required.",
              })}
            />
          </label>
          <label className={styles.label}>
            <span>Category:</span>
            <select {...register("category", { required: true })}>
              <option value="men">female</option>
              <option value="women">male</option>
            </select>
          </label>
          <label className={styles.label}>
            <span>Status:</span>
            <select {...register("status", { required: true })}>
              <option value="active">Active</option>
              <option value="inactive">In Active</option>
            </select>
          </label>

          <label htmlFor="tags" className={styles.label}>
            <span>Tags:</span>
          </label>
          <TagsInput
            id="tags"
            tags={tags}
            tagsInput={tagValue}
            handleTagsInput={handleTagsInput}
            handleDeleteTags={handleDeleteTags}
            className={styles.tags_input}
          />
          <label className={styles.label}>
            <span>Product Category:</span>
            <input
              type="text"
              {...register("productCategory", {
                required: "Description is required.",
              })}
            />
          </label>
          <label className={styles.label}>
            <span>Product Type:</span>
            <input
              type="text"
              {...register("productType", {
                required: "Product type is required.",
              })}
            />
          </label>
          {/* <fieldset>
            <legend>Sizes:</legend>
            <div className={styles.checkbox_wrapper}>
              {Object.keys(productInput.sizes).map((key) => (
                <label key={key}>
                  <input
                    type="checkbox"
                    value={key}
                    checked={productInput.sizes[key]}
                    onChange={handleSizesInput}
                  />
                  <span>{key.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </fieldset> */}

          <AttributesForm control={control} register={register} />

          <Variants
            productInput={productInput}
            variants={[]}
            images={images}
            control={control}
            register={register}
            setValue={setValue}
            // handleAddVariant={handleAddVariant}
            // handleEditVariantCount={handleEditVariantCount}
            // handleDeleteVariant={handleDeleteVariant}
            // handleVariantEditSubmit={handleVariantEditSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default ProductForm;
