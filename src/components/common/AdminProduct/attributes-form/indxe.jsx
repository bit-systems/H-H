import { Controller, useFieldArray } from "react-hook-form";

import styles from "../index.module.scss";

const AttributesForm = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <div>
      <h3>Attributes</h3>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id} style={{ padding: "4px" }}>
            <label className={styles.label}>
              <span>Label:</span>
              <input
                style={{ border: "1px solid black" }}
                type="text"
                {...register(`attributes.${index}.label`)}
              />
            </label>

            <label className={styles.label}>
              <span>Value:</span>

              <Controller
                render={({ field }) => (
                  <input style={{ border: "1px solid black" }} {...field} />
                )}
                name={`attributes.${index}.value`}
                control={control}
              />
            </label>

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
