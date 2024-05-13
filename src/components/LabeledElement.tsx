import styles from './LabeledElement.module.css';

function LabeledElement({ label, element, description }: { label: string, element: React.JSX.Element, description?: string }) {
  return (
    <div className={styles.labeledElement}>
      <label htmlFor={element.props.id}><abbr title={description}>{`${label}:`}</abbr> </label>
      {element}
    </div>
  );
}

export default LabeledElement;
