import * as Styles from "../assets/FormStyles";

export default function ErrorMessage({ message }) {
    if (!message) return null;
  
    return (
      <div style={Styles.AlertStyle}>
          <label>{message}</label>
      </div>
    );
  }
  