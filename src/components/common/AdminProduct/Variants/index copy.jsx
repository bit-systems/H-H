import VariantForm from "./VariantForm/index2";

import { FaPlusCircle } from "react-icons/fa";

import { Button } from "@/components/common";

import styles from "./index.module.scss";
import { Controller, useFieldArray } from "react-hook-form";

const VariantsV2 = ({ productInput, images, control, register, setValue }) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variants",
  });

  console.log(fields, "ss");
  return (
    <>
      <div className={styles.section} style={{ margin: "0" }}>
        <p className={styles.label}>Variants:</p>
        {fields.length > 0 && (
          <div className={styles.variants_container}>
            {fields.map((variant, variantIndex) => (
              <VariantForm
                key={variant.id}
                productInput={productInput}
                variant={variant}
                variantIndex={variantIndex}
                images={images}
                handleDeleteVariant={remove}
                register={register}
                control={control}
                updateVariant={update}
                setValue={setValue}
              />
            ))}
          </div>
        )}
        <Button
          className={styles.add_variant_button}
          type="button"
          onClick={() => append()}
        >
          Add Variant{" "}
          <i>
            <FaPlusCircle />
          </i>
        </Button>
      </div>
    </>
  );
};

export default VariantsV2;
