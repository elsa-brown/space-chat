import React from 'react';

//import Intro from './Intro.jsx';
import FormContainer from './forms/FormContainer';
// import ButtonContainer from './forms/ButtonContainer';
import Chevron from './Chevron';
import Instructions from './Instructions';
import Compatibility from './Compatibility';
import About from './About';

const Home = () => {
  return (
    <div className="home-container">
      <div id="intro">
        <h1> You are about to enter a virtual experience in<br />which users from across the world will<br />understand your language.<br /><br />And where space will understand how you feel.
        </h1>
      </div>
      <div id="form-container">
        <FormContainer />
      </div>
      <Chevron />
      <Instructions />
      <div id="compatibility">
        <Compatibility />
      </div>
      <Chevron />
      <div id="about">
        <About />
      </div>
    </div>
  )
}

export default Home;

