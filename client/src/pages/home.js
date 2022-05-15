import React from 'react';
import Card from "../components/card.js";
import Welcome from '../components/welcome.js';

const Home = () => {
    return (
   <>
   <Welcome/>
   <Card 
   className="home-page"
   hdrcolor="greenyellow"
   hdrtext="#282c34"
   bodycolor="dodgerblue"
   bodytext="#282c34"
   header="Welcome to iBank"
   title="Banking Made Easy"
   text="For all your internet Bankings needs!"
   body={(<img src="bank.png" 
            className="img-fluid w-75" 
            alt="Bank"/>)}
   />
   </>
    );
}
export default Home;