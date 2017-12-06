import React, { Component } from 'react';
import '../css/style.css';

const imageurl=process.env.PUBLIC_URL;
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
		            <li><a href="#">Home</a></li>            
		            <li><a href="#">Games</a></li>            
		            <li><a href="#">Blog</a></li>
		        </ul>
		        <div className="clr"></div>
		      </div>
		      <div className="logosection-main-right02"><h6><a href="#">Login</a></h6></div>
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
