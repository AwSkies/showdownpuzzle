import styles from './LabeledElement.module.css';

/**
 * Creates an element with the given label and an abbreviation given by the description. The element must be given a unique id. 
 */
function LabeledElement({ label, description, children: child }: { label: string, description?: string, children: JSX.Element }) {
  if (!child.props.id) {
    throw new Error(`Child of LabeledElement does not have an id.`);
  }

  return (
    <div className={styles.labeledElement}>
      <label htmlFor={child.props.id}><abbr title={description}>{`${label}:`}</abbr> </label>
      <span className={styles.content}>{child}</span>
    </div>
  );
}

export default LabeledElement;
