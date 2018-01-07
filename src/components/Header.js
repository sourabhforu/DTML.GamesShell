import React, { Component } from 'react';
import '../css/style.css';

const imageurl="https://blog.dtml.org/games/";
var loginURL = "https://dtml.org/Activity/GetUserName";

class Header extends Component {
	  constructor(props){
  	super(props)
  	this.state={
  		loggedin:false,
		username:""
  	}
  }
	componentDidMount() {   
	  var that = this;
	  var url = loginURL
	  fetch(url, { credentials: 'include' })
	  .then(function(response) {
		if (response.status >= 400) {
		  console.log("Bad response from server");
		  that.setState({ loggedin: false });
		}
		return response.json();
	  })
	  .then(function(data) {
		  that.setState({ username: data });
		  if (data !== "")
		  {
	      that.setState({ loggedin: true });
		  }
	  });
	}
	
  render() {
 
	if (this.state.loggedin === false)
	{
	 return (
      <div>
		 <div className="logosection">
		   <div className="logosection-main">
		     <div className="logosection-main-left"><a href="https://dtml.org"><img src={imageurl + 'images/logo-main.jpg'} alt="DTML Logo" /></a></div>
		     <div className="logosection-main-right">
		      <div className="logosection-main-right01">
		        <ul>
				   <li><a href="https://blog.dtml.org">{this.props.config.blog}</a></li>
					<li><a href="https://dtml.org/Home/Shopforgood">SHOP</a></li>
		            <li><a href="https://dtml.org/Home/Donate">DONATE</a></li>		  
		        </ul>
		        <div className="clr"></div>
		      </div>
		      <div className="logosection-main-right02"><h6><a href="https://dtml.org/Account/Login?ReturnUrl=https://blog.dtml.org/games/index.html">{this.props.config.login}</a></h6></div>
		      <div className="clr"></div>
		     </div>
			<div className="clr"></div>
		   </div>
		 </div>
      </div>
	  )
	} else
	{
		return (
		      <div>
		 <div className="logosection">
		   <div className="logosection-main">
		    <div className="logosection-main-left"><a href="https://dtml.org"><img src={imageurl + 'images/logo-main.jpg'} alt="DTML Logo" /></a></div>
		     <div className="logosection-main-right">
		      <div className="logosection-main-right01">
		        <ul>
				    <li> <a href="https://dtml.org/Student/PersonalProfile">Hello, {this.state.username}</a></li>   
		            <li><a href="https://dtml.org/Student/PersonalProfile">PROFILE</a></li>            
		            <li><a href="https://dtml.org/LearnPath/PublishedLearnPaths">E-LEARNING</a></li>     
		            <li><a href="https://dtml.org/Account/LogOffExternal">LOG OFF</a></li>    					
		        </ul>
		      </div>
		     </div>
		 </div>
		 </div>
      </div>);		
	}
  }
}

export default Header;
