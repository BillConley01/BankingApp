import { useState } from "react";
import Card from "../components/card.js";
import { useNavigate } from "react-router-dom";


const CreateAccount = () => {
  //shows input fields and hides them after from submitted
  const [show, setShow] = useState(true);
  //sets error messsage
  const [status, setStatus] = useState("");

  return (
    <Card
      hdrcolor="greenyellow"
      hdrtext="#282c34"
      bodycolor="dodgerblue"
      bodytext="#282c34"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <CreateSuccess setShow={setShow} />
        )
      }
    />
  );
};
function CreateSuccess(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}
const CreateForm = (props) => {
  //sets account properties
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for enabling submit button
  const [validTransaction, setValidTransaction] = useState(false);

  //to navigate to login page
  const navigate = useNavigate();

  const handleCreate = () => {
    //console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (password.length < 8) {
      alert("Password Requires a minimum of 8 Characters!");
      return;
    }
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    })();
  
    alert("Account Successfully Created!");
    clearForm();
    props.setShow(false);
    navigate("/login");
  };

  const enableSubmit = () => {
    if (name === "" || email === "" || password === "") {
      setValidTransaction(false);
    } else setValidTransaction(true);
    //console.log(`valid ${validTransaction}`);
  };

  const validate = (field, label) => {
    if (!field) {
      props.setStatus("Error: " + label);
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setValidTransaction(false);
  };

  return (
    <form>
      <label>Name</label>
      <input
        type="input"
        className="form-control"
        id="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
          enableSubmit();
        }}
      />
      <label>Email address</label>
      <input
        type="input"
        className="form-control"
        id="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
          enableSubmit();
        }}
      />
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
          enableSubmit();
        }}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light ml-auto"
        disabled={!validTransaction}
        onClick={handleCreate}
      >
        Create Account
      </button>
    </form>
  );
};
export default CreateAccount;
