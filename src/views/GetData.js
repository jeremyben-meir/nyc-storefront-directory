import { useState } from "react";
import { ethers } from "ethers";
import { API } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import AlertMessage from "../components/AlertMessage";
import TxList from "../components/TxList";
import * as Styles from "../assets/FormStyles";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const startPayment = async ({ setAlert, setTxs, email }) => {
  try {
    if (!email)
        throw new Error("Email address required.");
    if (!validateEmail(email))
        throw new Error("Email address must be formatted correctly.");
    if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (!(chainId==0x2a))
        throw new Error("You Must be connected to the Mainnet Network.");

    const ether = ".00001";
    const addr = "0x309702c7C86edaE9c0e9b8B681165BA88B7a570d";

    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    await API.graphql({
      query: createTodo,
      variables:{
        input:{
          email
        }
      }
    })
    console.log({ ether, addr });
    console.log("tx", tx);
    setAlert({
      "message":"Payment received! Check your email address.",
      "type":"success"
    });
} catch (err) {
    setAlert({
      "message":err.message,
      "type":"error"
    });
    // setTxs();
  }
};

export const GetData = (params) => {
    const [alert, setAlert] = useState();
    const [txs, setTxs] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      setAlert();
      await startPayment({
        setAlert,
        setTxs,
        email: data.get("email")
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div style={{width: "75%", height:"300px", flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center",margin:"auto",position:"absolute",top:0,bottom:0,left:0,right:0, backgroundColor:"white"}}>
            
            <h1>
                Submit Payment
            </h1>

            <input style={Styles.TextBoxStyle}
                type="text"
                name="email"
                placeholder="Email Address to Send Dataset"
            />

            <div style={{width:"75%"}}>
                <button
                style = {Styles.ButtonStyle}
                type="submit"
                >
                Pay now
                </button>
                <AlertMessage details={alert} />
                <TxList txs={txs} />
            </div>

        </div>
      </form>
    );
}
export default GetData;