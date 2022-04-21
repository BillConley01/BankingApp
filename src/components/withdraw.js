import React from 'react';
import UserContext from "../context.js";
import ATM from "./ATM";
import Card from "./card.js";
const Withdraw = () => {
  // gets context info
  const ctx = React.useContext(UserContext);
  //state for withdrawal amount
  const [amount, setAmount] = React.useState(0.00);
  //gets user account info
  const index = ctx.users.length-1;
  console.log(index);
  const [totalState, setTotalState] = React.useState(ctx.users[index].balance);
  
  //sets atm component status to withdraw
  const [atmMode, setAtmMode] = React.useState("Cash Back");
  //state to enable and disable submit button
  const [validTransaction, setValidTransaction] = React.useState(false);
  // Clears input field after form is submitted or ATM mode Changed
  const [value, setValue] = React.useState("");
  //displays balance amount
  let status = `Balance: $${totalState.toFixed(2)} `;

    const handleChange = (event) => {
      setValue(event.target.value);
      setAmount(Number(event.target.value));
      if(event.target.value<=0){
        alert("Enter a Positive Value!");
        setValidTransaction(false);
      } else if(atmMode=="Cash Back" && Number(event.target.value) >totalState){
        alert("Insufficient Balance!");
        setValidTransaction(false);
      } else setValidTransaction(true);
    };

    const handleSubmit = (event) => {
      let newTotal = 0;
      if(Number(amount) >totalState){
        newTotal = totalState;
        setValidTransaction(false);
        //insufficient balance message
        alert("Insufficient Balance!");
      }else if(atmMode=="Cash Back" && Number(amount) <=totalState){
          newTotal = totalState - amount;
          alert(`$${amount.toFixed(2)} Succesfully Withdrawn!`);
          setValidTransaction(false);
      } else newTotal = totalState;
      setTotalState(newTotal);
      ctx.users[index].balance = newTotal;
      // Clears input field after form is submitted
      setValue("");
      event.preventDefault();
    };
    
     
    return (
        <Card 
        className="withdrawal-page p-3"
        hdrcolor="greenyellow"
        hdrtext="#282c34"
        bodycolor="dodgerblue"
        bodytext="#282c34"
        header="Withdrawals"
        title={status}
        text="Enter Withdrawal Amount"
        body={(
      <form 
      className="text-center"
      onSubmit={handleSubmit}>
        <ATM onChange={handleChange} atmMode={atmMode} validTransaction={validTransaction} value={value}/>
      </form>)}>
      </Card>
    );
  };
export default Withdraw;