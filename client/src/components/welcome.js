import { useState } from "react";
const Welcome = () => {
  const [name] = useState(localStorage.getItem("token1"));

  return (
    <>
      {name ? <p className="welcome">Welcome {name}!</p> :<></>}
    </>
  );
};
export default Welcome;
