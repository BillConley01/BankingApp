import React, { useEffect, useState } from "react";
import ATM from "../components/ATM";
import Card from "../components/card.js";
import Welcome from "../components/welcome";

const Withdraw = () => {
  //state for amount and email
  const [amount, setAmount] = useState(0.0);
  //sets account balance
  const [total, setTotal] = useState(0);
  //sets atm component status to withdraw
  const [atmMode] = useState("Cash Back");
  //state to enable and disable submit button
  const [validTransaction, setValidTransaction] = useState(false);
  // Clears input field after form is submitted or ATM mode Changed
  const [value, setValue] = useState("");
  //displays balance amount
  let status = `Balance: $${Number(total).toFixed(2)} `;

  const handleChange = (event) => {
    setValue(event.target.value);
    setAmount(Number(event.target.value));
    if (event.target.value <= 0) {
      alert("Enter a Positive Value!");
      setValidTransaction(false);
    } else if (Number(event.target.value) > total) {
      alert("Insufficient Balance!");
      setValidTransaction(false);
    } else setValidTransaction(true);
  };

  useEffect(() => {
    const balance = localStorage.getItem("token2");
    if (balance) {
      setTotal(balance);
    } else {
      localStorage.removeItem("token2");
    }
  }, []);

  //handles submit events
  const handleSubmit = (event) => {
    if (Number(amount) <= total && Number(amount) >= 0) {
      fetch(`/account/update/-${amount}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            const balance = data.value.balance - amount;
            setTotal(balance);
            localStorage.setItem("token2", balance);
          } catch (err) {
            console.log("err:", text);
          }
        });
      alert(`$${amount.toFixed(2)} Succesfully Withdrawn!`);
      setValidTransaction(false);
    } else {
      setValidTransaction(false);
      //insufficient balance message
      alert("Insufficient Balance!");
    }
    // Clears input field after form is submitted
    setValue("");
    event.preventDefault();
  };

  return (
    <>
      <Welcome />
      <Card
        className="withdrawal-page p-3"
        hdrcolor="greenyellow"
        hdrtext="#282c34"
        bodycolor="dodgerblue"
        bodytext="#282c34"
        header="Withdrawals"
        title={status}
        text="Enter Withdrawal Amount"
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
export default Withdraw;
