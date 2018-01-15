import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../reducers/languageReducer';
import { setScene } from '../reducers/sceneReducer';

import HomeMenuLanguage from './HomeMenuLanguage';
import HomeMenuScene from './HomeMenuScene';

class HomeMenu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			language: ''
		}

		this.selectLanguage = this.selectLanguage.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	selectLanguage(evt) {
		let language = evt.target.value;
		console.log('language', language)
    this.setState({ language: language });
  }

	handleClick(evt) {
    evt.preventDefault()
    let scene = evt.target.name
    console.log('scene is ', scene)
    this.props.setLanguage(this.state.language || 'en-US')
    this.props.setScene(scene)
  }

	render() {
		console.log('this.state.language ', this.state.language)
		return (
			<div>
        <HomeMenuLanguage selectLanguage={this.selectLanguage} />
        <HomeMenuScene handleClick={this.handleClick} />
      </div>
		)
	}
}

export default connect(null, { setLanguage, setScene })(HomeMenu);

