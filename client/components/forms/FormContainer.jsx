import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../../reducers/languageReducer';
import { setScene } from '../../reducers/sceneReducer';

import LanguageMenu from './LanguageMenu';
import SceneButtons from './SceneButtons.jsx';

class FormContainer extends Component {
	constructor() {
		super()
		this.state = {
			language: ''
		}

		this.handleLanguageChange = this.handleLanguageChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleLanguageChange(evt) {
		let language = evt.target.value;
		console.log('language', language)
    this.setState({ language: language });
  }

	handleClick(evt) {
    evt.preventDefault()
    let scene = evt.target.name
    console.log('scene is ', scene)
    this.props.setLanguage(this.state.language || 'en')
    this.props.setScene(scene)
  }

	render() {
		console.log('this.state.language ', this.state.language)
		return (
			<div>
        <LanguageMenu handleLanguageChange={this.handleLanguageChange} />
        <SceneButtons handleClick={this.handleClick} />
      </div>
		)
	}
}

export default connect(null, { setLanguage, setScene })(FormContainer);
