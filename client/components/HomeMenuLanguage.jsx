import React from 'react';

const LanguageMenu = (props) => {

	const selectLanguage = props.selectLanguage;

	return (
    <div className="form">
      <label className="control-label">Select your language:</label>
      <select onChange={props.selectLanguage} className="form-control" id="select" >
        <option value="en-US">English</option>
        <option value="es-ES">Spanish</option>
        <option value="zh-CN">Chinese</option>
        <option value="ar-SA">Arabic</option>
        <option value="de-DE">German</option>
        <option value="fr-FR">French</option>
        <option value="it-IT">Italian</option>
        <option value="pt-PT">Portuguese</option>
        <option value="nl-NL">Dutch</option>
        <option value="ja-JP">Japanese</option>
        <option value="ko-KR">Korean</option>
        <option value="ru-RU">Russian</option>
      </select>
    </div>
	)
}

export default LanguageMenu;
