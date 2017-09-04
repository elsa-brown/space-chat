import React from 'react';

const LanguageList = (props) => {

	const handleLanguageChange = props.handleLanguageChange;

	return (
		<div className="form">
      <label className="control-label">Select your language:</label>
      <select className="form-control" id="select" onChange={props.handleLanguageChange}>
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
	)
}

export default LanguageList;
