import styles from './LabeledElement.module.css';

/**
 * Creates an element with the given label and an abbreviation given by the description. The element must be given a unique id. 
 */
function LabeledElement({ label, element, description }: { label: string, element: React.JSX.Element, description?: string }) {
  if (!element.props.id) {
    throw new Error(`Element ${element} does not have an id`);
  }
  return (
    <div className={styles.labeledElement}>
      <label htmlFor={element.props.id}><abbr title={description}>{`${label}:`}</abbr> </label>
      <span className={styles.content}>{element}</span>
    </div>
  );
}

export default LabeledElement;
