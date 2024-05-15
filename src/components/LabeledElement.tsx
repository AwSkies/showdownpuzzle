import styles from './LabeledElement.module.css';

/**
 * Creates an element with the given label and an abbreviation given by the description. The element must be given a unique id. 
 */
function LabeledElement({ label, description, children: child }: { label: string, description?: string, children: JSX.Element }) {
  if ((child.type in ['input', 'meter', 'progress', 'select', 'textarea'])) {
    throw new Error(`Element of type ${child.type} is not labelable.`);
  }
  if (!child.props.id) {
    throw new Error(`Element ${child} does not have an id`);
  }

  return (
    <div className={styles.labeledElement}>
      <label htmlFor={child.props.id}><abbr title={description}>{`${label}:`}</abbr> </label>
      <span className={styles.content}>{child}</span>
    </div>
  );
}

export default LabeledElement;
