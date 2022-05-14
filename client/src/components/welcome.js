import { useState } from "react";
const Welcome = () => {
  const [name, setName] = useState(localStorage.getItem("token3"));

  return (
    <>
      {name ? <p className="welcome">Welcome {name}!</p> :<></>}
    </>
  );
};
export default Welcome;
