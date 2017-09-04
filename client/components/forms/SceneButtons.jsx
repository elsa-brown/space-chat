import React from 'react';
import { Link } from 'react-router';

const SceneButtons = (props) => {
	return (
		<div>
		<div className="space-btn">
      <button className="btn btn-default" onClick={props.handleClick}><Link to="/room" name="bubbles">ENTER BUBBLES</Link></button>
      <button className="btn btn-default" onClick={props.handleClick}><Link to="/room" name="plasma" >ENTER PLASMA</Link></button>
      </div>
      <div className="space-btn">
        <button className="btn btn-default" onClick={props.handleClick}><Link to="/room" name="cosmos">ENTER COSMOS</Link></button>
        <button className="btn btn-default" onClick={props.handleClick} ><Link to="/room" name="ufo">ENTER UFO</Link></button>
      </div>
		</div>
	)
}

export default SceneButtons;
