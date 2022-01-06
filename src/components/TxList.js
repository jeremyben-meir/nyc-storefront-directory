import * as Styles from "../assets/FormStyles";

export default function TxList({ txs }) {
    if ((!txs) || (txs.length === 0)) return null;
  
    return (
      <>
        {txs.map((item) => (
          <div key={item} style={Styles.MsgStyle}>
              <label>Label {item.hash}</label>
          </div>
        ))}
      </>
    );
  }
  