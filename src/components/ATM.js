
const ATM = ({ onChange, atmMode, validTransaction, value }) => {
      if(atmMode !== "")  {  return (
            <div>
              <input id="number-input" type="number" value={value} onChange={onChange}></input>
              <input className="button mx-1" type="submit" value="Submit" disabled={!validTransaction} id="submit-input"></input>
            </div>
          );
    } else return <></>;
  };

  export default ATM;