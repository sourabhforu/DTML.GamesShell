import React, { Component } from 'react';
import Social from '../social.js';
import Rater from 'react-rater'
import ReactGA from 'react-ga';

const imageurl="http://blog.dtml.org/games/";
var rankingURL = 'https://dtml.org/api/RatingService/Rank';

class Gamecontent extends Component {
  constructor(props){
  	super(props)
  	this.state={
  		rating:3,
  		frameText: ""
  	}
  }

  	componentDidMount() {  
      ReactGA.pageview(window.location.hash);	
	  document.location.hash=this.props.gameContent.title;
	  var that = this;
	  var url = rankingURL + "/?key="+this.props.gameContent.title;
	  fetch(url)
	  .then(function(response) {
		if (response.status >= 400) {
		  console.log("Bad response from server");
		  that.setState({ rating: 3 });
		}
		return response.json();
	  })
	  .then(function(data) {
	      that.setState({ rating: data });
	  });
	}
	
  clickBack(){
  	this.props.Back(true)
  }
  
  toggleCode(){
    var domNode = this.refs.framecontainer;
    var frameCode = domNode.innerHTML+"<div><a href='http://dtml.org'>Game provided by dtml.org</a></div>";
    this.setState({displayCode: true});
    this.setState({frameText: frameCode});	
  }
  
  handleRate({ rating, type }) {
  if (type === 'click') {
	   var url = rankingURL + "/?key="+this.props.gameContent.title+"&rank="+rating
       fetch(url, {
         method: 'post',
         headers: {'Content-Type':'application/json', 'Accept': 'application/json, text/plain, */*'},
         });
        }
    }
 
  render() {
    return (
    	<div>
		
			<div className="bannersection">
				<img src={imageurl+"images/game-banner.png"} alt="{this.props.gameContent.title}" />
				<div className="bannersection01">
					<h2>{this.props.gameContent.title}</h2>
				</div>  
			</div>

			<div className="contentsection gamecontent">
				<div className="contentsection-main">
				 
				  <div className="gamesection">
				    <div className="gamesection01">
				      <h2>{this.props.gameContent.title}</h2>
				      <p>{this.props.gameContent.description}</p>
				    
				      <Social />
				      <div className="clr"></div>
				    </div>
				    
				    <div className="gamesection01-top">
				     
					  <div id="framecontainer" ref="framecontainer">
					  	<iframe className='gameframe' allowtransparency='true' title={this.props.gameContent.title} src={this.props.gameContent.url} width='100%' height="600" frameBorder='0'></iframe>
					  </div>
				    </div>

				    <div className="ratesection">
				      <div className="ratesection-top">
				        <div className="ratesection-top-left">

						  <div>
						      <Rater total={5} rating={this.state.rating} onRate={this.handleRate.bind(this)} />
						  </div>


				       <div className="clr"></div>
				        </div>
				       
				       <div className="ratesection-top-right">
				        <h6><a className="embed-link" onClick={this.toggleCode.bind(this)}> &lt;/&gt; {this.props.config.embed}</a></h6>

				
				        <h6><a href="https://github.com/seattleuser/DTML.GamesShell ">{this.props.config.contribute}</a></h6>
				        <div className="clr"></div>
				       </div>
				       <div className="clr"></div>
						{this.state.displayCode ? 
							
							<textarea id='codeArea' className='codearea'>{this.state.frameText}</textarea>		
							: null
						}
				      </div>				      
				     
				     <div className="ratesection-bottom">
				       <div className="ratesection-bottom01">
				         <h5><a onClick={this.clickBack.bind(this)}>{this.props.config.back}</a></h5>
				       </div>
				       <div className="ratesection-bottom02">
				         <h6><a href="http://dtml.org/Home/Edubot"><img src={imageurl+"images/goto-pic.png"} alt="Edubot" /></a></h6>
				       </div>
				       <div className="clr"></div>
				     </div>				     			     
				    </div>				  
				  </div>
				</div>
			</div>
    	</div>
    );
  }
}
export default Gamecontent;
