import React, { Component } from 'react';

import Intro from './Intro.jsx';
import HomeForm from './HomeForm.jsx';
import Instructions from './Instructions.jsx';
import Compatibility from './Compatibility.jsx';
import About from './About.jsx';
import Chevron from './Chevron.jsx';


class Home extends Component {
  constructor() {
    super()
    this.state = {
      language: '',
      scene: ''
    }
  }

  render() {
    return (
      <div className="home-container">
        <div className="above-fold">
          <Intro />
          <br />
          <br />
          <br />
          <HomeForm />

          <div id="instructions" className="container">
            <div className="row">
              <Instructions />
              <Compatibility />
              <Chevron />
              <About />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Home;

