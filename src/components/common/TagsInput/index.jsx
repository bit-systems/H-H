import { FaTimesCircle } from 'react-icons/fa';

import styles from './index.module.scss';

const TagsInput = ({
  id,
  tags,
  tagsInput,
  handleTagsInput,
  handleDeleteTags,
  className,
}) => {
  return (
    <div className={`${styles.tags_input} ${className}`}>
      <ul>
        {tags.map((tag, i) => (
          <li key={tag} className={styles.tag}>
            <span>{tag}</span>
            <i
              onClick={() => handleDeleteTags(tag, i)}
              className={styles.delete}
            >
              <FaTimesCircle />
            </i>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Type ',' to add tags"
        value={tagsInput}
        id={id}
        onKeyUp={handleTagsInput}
        onChange={handleTagsInput}
        autoComplete="off"
      />
    </div>
  );
};

export default TagsInput;
