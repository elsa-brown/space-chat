import React from 'react';
import { Link } from 'react-router';

const scenes = ['bubbles', 'plasma', 'cosmos', 'ufo'];


const SceneButtons = (props) => {
	return (
    <div>
    {scenes.map((scene, idx) => 
      <button 
        className="btn btn-default" 
        onClick={props.handleClick} 
        key={idx}>
        <Link to="/spacechat" name={scene}>ENTER {scene.toUpperCase()}</Link>
      </button>
    )}
    </div>
	)
}

export default SceneButtons;  