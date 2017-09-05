import React from 'react';

import Intro from './homepage/Intro';
import FormContainer from './forms/FormContainer';
import Chevron from './homepage/Chevron';
import Instructions from './homepage/Instructions';
import Compatibility from './homepage/Compatibility';
import About from './homepage/About';

const Home = () => {
  return (
    <div className="home-container">
      <div id="intro">
        <Intro />
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
