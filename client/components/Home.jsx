import React from 'react';

import HomeMenu from './HomeMenu';
import HomeInstructions from './HomeInstructions';
import HomeCompatibility from './HomeCompatibility';
import HomeAbout from './HomeAbout';

const Home = () => {
  return (
    <div className="home-container">
      <div id="intro">
        <h1> You are about to enter a virtual experience in<br />
        which users from across the world will<br />
        understand your language.<br /><br />
        And where space will understand how you feel.
        </h1>
      </div>
      <div id="menu">
        <HomeMenu />
      </div>
      <div
        className="glyphicon glyphicon-chevron-down"
        aria-hidden="true"
      />
      <HomeInstructions />
      <div id="compatibility">
        <HomeCompatibility />
      </div>
      <div
        className="glyphicon glyphicon-chevron-down"
        aria-hidden="true"
      />
      <div id="about">
        <HomeAbout />
      </div>
    </div>
  )
}

export default Home;

