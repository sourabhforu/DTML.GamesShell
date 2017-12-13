import React, { Component } from 'react';
import '../css/style.css';

const imageurl="http://blog.dtml.org/games/";
class Header extends Component {
  render() {
 
    return (
      <div>
		 <div className="logosection">
		   <div className="logosection-main">
		     <div className="logosection-main-left"><a href="#"><img src={imageurl + 'images/logo-main.jpg'} alt="" /></a></div>
		     <div className="logosection-main-right">
		      <div className="logosection-main-right01">
		        <ul>
		            <li><a href="http://dtml.org">{this.props.config.home}</a></li>            
		            <li><a href="http://blog.dtml.org/games/index.html">GAMES</a></li>            
		            <li><a href="http://blog.dtml.org">{this.props.config.blog}</a></li>
		        </ul>
		        <div className="clr"></div>
		      </div>
		      <div className="logosection-main-right02"><h6><a href="https://dtml.org/Account/Login">{this.props.config.login}</a></h6></div>
		      <div className="clr"></div>
		     </div>
		     <div className="clr"></div>
		   </div>
		 </div>
      </div>
    );
  }
}

export default Header;
