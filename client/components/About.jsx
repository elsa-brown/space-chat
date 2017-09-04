import React from 'react';

const About = () => {
	return (
		<div id="about">
			<h3 className="instructions-header">About</h3>
			<p className="instructions-p">Spacechat is a virtual reality chatroom that allows users to interpret and experience speech with multiple senses. Created by <a href="http://elsa-brown.com">Elsa Brown</a>, <a href="https://github.com/thefishter">Nicole Fish</a>, <a href="http://keziyah.com">Keziyah Lewis</a>, and <a href="https://github.com/ssundby">Stefanie Sundby</a> over two weeks as a senior capstone project for <a href="https://www.gracehopper.com/">The Grace Hopper Program.</a></p>
			<p className="instructions-p">Spacechat was built with React-Redux, sockets.io, and A-Frame.</p>
			<p className="instructions-p"><a href="https://github.com/space-chat/space-chat">View on GitHub.</a></p>
		</div>
	)
};

export default About;
