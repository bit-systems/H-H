import { Controller, useFieldArray } from "react-hook-form";

import styles from "../index.module.scss";

const AttributesForm = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <div>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <label className={styles.label}>
              <span>Label:</span>
              <input type="text" {...register(`attributes.${index}.label`)} />
            </label>

            <Controller
              render={({ field }) => <input {...field} />}
              name={`attributes.${index}.value`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        Add Attributes
      </button>
    </div>
  );
};

export default AttributesForm;
