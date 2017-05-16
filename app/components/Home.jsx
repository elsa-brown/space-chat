import React, { Component } from 'react' 
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setLanguage } from '../reducers/languageReducer.jsx'
import { setScene } from '../reducers/sceneReducer.jsx'
import { openSocket } from '../sockets.js'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      language: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  componentWillMount() {
    // establish new socket connection
    openSocket()
  }

  handleClick(e) {
    console.log('target name', e.target.name)
    e.preventDefault()
    // dispatch action with language from state
    this.props.setLanguage(this.state.language || 'en')
    // send scene selection on props
    this.props.setScene(e.target.name)
  }


  handleLanguageChange(e) {
    // set selected language on state
    this.setState({ language: e.target.value })
  }

	render() {
		return (
  		<div className="wrapper">
        <h3>You are about to enter a virtual experience in<br />which users from across the world will<br />understand your language.<br /><br />And where space will understand how you feel.</h3>
        <br />
        <br />
        <br />
        <div className="form">
          <label className="control-label">Select your language:</label>
        </div>
        <div>
          <select className="form-control" id="select"onChange={this.handleLanguageChange}>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='zh'>Chinese</option>
            <option value='ar'>Arabic</option>
            <option value='de'>German</option>
            <option value='fr'>French</option>
            <option value='it'>Italian</option>
            <option value='pt'>Portuguese</option>
            <option value='nl'>Dutch</option>
            <option value='ja'>Japanese</option>
            <option value='ko'>Korean</option>
            <option value='ru'>Russian</option>
          </select>
        </div>
        <br />
        <br />
        <br />
        <button className="btn btn-default" name="bubbles" onClick={this.handleClick}><Link to="/room">ENTER BUBBLESPACE</Link></button>
        <button className="btn btn-default" name="knots" onClick={this.handleClick}><Link to="/room">ENTER KNOTSPACE</Link></button>
        <button className="btn btn-default" name="space" onClick={this.handleClick}><Link  to="/room">ENTER SPACESPACE</Link></button>
        <button className="btn btn-default" name="cubes" onClick={this.handleClick} ><Link to="/room">ENTER CUBESPACE</Link></button>
      </div>
		)
	}
}

export default connect(null, { setLanguage, setScene })(Home)
