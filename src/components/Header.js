import React, { Component } from 'react';
import { isEmpty, keys } from 'lodash'

import '../css/style.css';

const imageurl="https://games.dtml.org/games/";
var loginURL = "https://dtml.org/Activity/GetUserName";

class Header extends Component {

	constructor(props) {
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
		  })
		  .catch(function(error) {
		  	console.log("Request failed")
		  })
	}
	
  render() {
  	var custom=[]
	var Logo
  	var logoImageUrl = imageurl + 'images/logo-main.jpg'
  	var menuColor=''
  	if(!isEmpty(this.props.config.customization)) {
  		custom = this.props.config.customization
  		logoImageUrl = custom.logoURL
  		menuColor = custom.MenueColor
  	}
	
	if (logoImageUrl !=="")
	{
		Logo = <a href="https://dtml.org"><img src={logoImageUrl} alt="DTML Logo" style={{height: '37px'}} /></a>
	}

	  return (
      <div>
				<div className="logosection" style={!isEmpty(menuColor)?{background: menuColor}:null}>
				  <div className="logosection-main">
				    <div className="logosection-main-left">
					{Logo}
				    </div>

				    {
				    	!this.state.loggedin ?
						    <div className="logosection-main-right">
						      <div className="logosection-main-right01">
					        	{
					        		!this.props.config.customization ?
					        		<ul>
									 <li><a href="https://dtml.org">{this.props.config.home}</a></li>
										    <li><a href="https://games.dtml.org">{this.props.config.blog}</a></li>
											<li><a href="https://games.dtml.org/games">{this.props.config.game}</a></li>
						          </ul>
						          :
						          	<ul> 
						          		{
						          			keys(custom.Menue).map((key) => {
						          				return (
						          					<li><a href={custom.Menue[key].Value}>{custom.Menue[key].Key}</a></li>
						          				)}
						          			)
						          		}
						          	</ul>
					        	}						       
						      </div>
						      <div className="logosection-main-right02"><h6><a href="https://dtml.org/Account/Login?ReturnUrl=https://games.dtml.org/games/index.html">{this.props.config.login}</a></h6>
						      </div>
						    </div>
						  :
						    <div className="logosection-main-right">
						      <div className="logosection-main-right01">
						        <ul>
							  <li> <a href="https://dtml.org/Student/PersonalProfile">{this.state.welcome}, {this.state.username}</a></li>   
						          <li><a href="https://dtml.org/Student/PersonalProfile">{this.props.config.profile}</a></li>            
						          <li><a href="https://games.dtml.org/games">{this.props.config.game}</a></li>   
						          <li><a href="https://dtml.org/Account/LogOffExternal">{this.props.config.logoff}</a></li>    					
						        </ul>
						      </div>
						    </div>
				    }

				  </div>
				</div>
      </div>
	  )	
  }
}

export default Header;