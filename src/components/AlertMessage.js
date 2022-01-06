import * as Styles from "../assets/FormStyles";

export default function ErrorMessage( {details} ) {
    if (!details) return null;
  
    return (
      <div style={details.type == "error" ? Styles.AlertStyle : Styles.MsgStyle }>
          <label>{details.message}</label>
      </div>
    );
  }
  