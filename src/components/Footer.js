import React, { Component } from 'react';

import '../css/font-awesome.min.css';
import '../css/responsive.css';

const imageurl="https://blog.dtml.org/games/";

class Footer extends Component {

	constructor(props) {
		super(props)
		this.state={
			config : props.config		
		}
	}

  render() {
    return (
      <div>
      	<div className="footertop-section">
      		<img src={imageurl + 'images/footerbg-01.png'} alt="" />
      	</div>
			  <div className="footersecion">
				  <div className="footersecion-main"> 
				    <div className="footersecion-main-left">
				      <ul>
			          <li><a href="https://www.facebook.com/distantteaching/"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
			          <li><a href="https://twitter.com/DistantTeaching"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
			          <li><a href="https://www.linkedin.com/company/distant-teaching-and-mobile-learning"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
			          <li><a href="https://www.youtube.com/channel/UCwF13kloyxnifaNCHQUL2rQ/featured"><i className="fa fa-youtube" aria-hidden="true"></i></a></li>
				      </ul>
				      <div className="clr"></div>
				    </div>
				    <div className="footersecion-main-right"><p>dtml.org &copy; 2017 All Rights Reserved | <a href='https://dtml.org/Home/TermsandConditions'>{this.props.config.terms}</a> </p></div>
				    <div className="clr"></div>
				  </div>
			  </div>
      </div>
    );
  }
}

export default Footer;