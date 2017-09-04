import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setLanguage } from '../reducers/languageReducer.js';
import { setScene } from '../reducers/sceneReducer.js';

import LanguageList from './LanguageList.jsx';

class HomeForm extends Component {
	constructor() {
		super()
		this.state = {
			language: '',
			scene: ''
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleLanguageChange = this.handleLanguageChange.bind(this);
	}

	  handleClick(e) {
    e.preventDefault()
    // dispatch action with language from state
    this.props.setLanguage(this.state.language || 'en')
    // send scene selection on props
    this.props.setScene(e.target.name)
  }


	handleLanguageChange(evt) {
    this.setState({ language: evt.target.value });
  }

	render() {
		return (
			<div>
			<div>
        <LanguageList handleLanguageChange={this.handleLanguageChange} />
        <br />
        <br />
        <br />
        <div id="enter-space">
          <div className="button-container">
            <div className="space-btn">
              <button className="btn btn-default" onClick={this.handleClick}><Link to="/room" name="bubbles">ENTER BUBBLES</Link></button>
              <button className="btn btn-default" onClick={this.handleClick}><Link to="/room" name="plasma" >ENTER PLASMA</Link></button>
              </div>
              <div className="space-btn">
                <button className="btn btn-default" onClick={this.handleClick}><Link to="/room" name="cosmos">ENTER COSMOS</Link></button>
                <button className="btn btn-default" onClick={this.handleClick} ><Link to="/room" name="ufo">ENTER UFO</Link></button>
              </div>
            </div>
            <div className="down-chevron">
              <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
		)
	}
}

export default connect(null, { setLanguage, setScene })(HomeForm);
