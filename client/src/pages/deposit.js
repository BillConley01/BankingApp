import React, { useEffect, useState } from "react";
import ATM from "../components/ATM";
import Card from "../components/card.js";
import Welcome from "../components/welcome";
const Deposit = () => {
  //state for amount and email
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0.0);
  //sets account balance
  const [total, setTotal] = useState(0);
  //sets atm component status to deposit
  const [atmMode, setAtmMode] = useState("Deposit");
  //state to enable and disable submit button
  const [validTransaction, setValidTransaction] = useState(false);
  // Clears input field after form is submitted or ATM mode Changed
  const [value, setValue] = useState("");
  //displays balance message
  let status = `Balance: $${Number(total).toFixed(2)} `;

  //handles change events
  const handleChange = (event) => {
    setValue(event.target.value);
    setAmount(Number(event.target.value));
    if (event.target.value <= 0) {
      alert("Enter a Positive Value!");
      setValidTransaction(false);
    } else setValidTransaction(true);
  };

  useEffect(() => {
    const email = localStorage.getItem("token1");
    const balance = localStorage.getItem("token2");
    if (email && balance) {
      setEmail(email);
      setTotal(balance);
      console.log(email);
      console.log(balance);
    } else {
      localStorage.removeItem("token1");
      localStorage.removeItem("token2");
    }
  }, []);
  
  //handles submit events
  const handleSubmit = () => {
    if (atmMode == "Deposit" && Number(amount) >= 0) {
      fetch(`/account/update/${email}/${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            const balance = data.value.balance + amount;
            setTotal(balance);
            localStorage.setItem("token2", balance);
          } catch (err) {
            console.log("err:", text);
          }
        });
      alert(`$${amount.toFixed(2)} Succesfully Deposited!`);
      setValidTransaction(false);
    } else {
      alert(`Unable to Process Negative Values!`);
    }
    // Clears input field after form is submitted
    setValue("");
  };

  return (
    <>
    <Welcome/>
    <Card
      className="deposit-page p-3"
      hdrcolor="greenyellow"
      hdrtext="#282c34"
      bodycolor="dodgerblue"
      bodytext="#282c34"
      header="Deposits"
      title={status}
      text="Enter Deposit Amount"
      body={
        <form className="text-center" onSubmit={handleSubmit}>
          <ATM
            onChange={handleChange}
            atmMode={atmMode}
            validTransaction={validTransaction}
            value={value}
          />
        </form>
      }
    ></Card>
    </>
  );
};
export default Deposit;
