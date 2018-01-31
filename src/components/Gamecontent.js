import React, { Component } from 'react'
import Rater from 'react-rater'
import ReactGA from 'react-ga'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom';

const imageurl="https://blog.dtml.org/games/";
var rankingURL = 'https://dtml.org/api/RatingService/Rank';

class Gamecontent extends Component {

  constructor(props){
  	super(props)
  	this.state={  
  		rating:0,
  		gameContent: props.gameContent,
  		frameText: "",
			startTime: new Date().getTime()
  	}  
  	this.componentGracefulUnmount = this.componentGracefulUnmount.bind(this)
  }
   
  componentGracefulUnmount() {
    window.removeEventListener('beforeunload', this.componentGracefulUnmount);			
		var timeSpentMilliseconds = new Date().getTime() - this.state.startTime;
    var t = timeSpentMilliseconds / 1000 / 60;
    var data = { "envelop": null, "page" : this.state.gameContent.id, "time" : t, "eventType" : "", "eventData" : 0 }
		var url = "https://dtml.org/Activity/Record";
    fetch(url, {
		  method: 'POST',
			headers: {'Content-Type':'application/json', 'Accept': 'application/json, text/plain, */*'},
			body:JSON.stringify(data)
			});
    } 
  
  componentWillUnmount() {
    this.componentGracefulUnmount()
  }

  componentWillMount() {
  	if(isEmpty(this.state.gameContent)) {
  		var gameID = window.location.pathname.substring(1)
  		var gameContent = this.props.config.games.find( (game) => {return game.id === gameID} )
  		this.setState({ gameContent: gameContent})
  	}
  }
		
  componentDidMount() {  
    ReactGA.pageview(window.location.hash);	
	  ReactGA.event({
      category: 'Games',
      action: 'Game__'+this.state.gameContent.id
    });
	  window.addEventListener('beforeunload', this.componentGracefulUnmount);
	  var that = this;
	  var url = rankingURL + "/?key="+this.state.gameContent.id;
	  fetch(url)
	  	.then(function(response) {
				if (response.status >= 400) {
				  console.log("Bad response from server");
				  that.setState({ rating: 0 });
				}
				return response.json();
		  })
		  .then(function(data) {
		      that.setState({ rating: data });
		  });
  }
	  
  handleRate({ rating, type }) {
	  if (type === 'click') {
		  var url = rankingURL + "/?key="+this.state.gameContent.id+"&rank="+rating
      fetch(url, {
          method: 'post',
          headers: {'Content-Type':'application/json', 'Accept': 'application/json, text/plain, */*'}
        }
      );
    }
  }
 
  render() {
    return (
    	<div>
				<div className="bannersection">
					<img src={imageurl+"images/game-banner.png"} alt="{this.state.gameContent.title}" />
					<div className="bannersection01">
						<h2>{this.state.gameContent.title}</h2>
					</div>  
				</div>

				<div className="contentsection gamecontent">
					<div className="contentsection-main">
					 
					  <div className="gamesection">
					    <div className="gamesection01">
					      <p>{this.state.gameContent.description}</p>
				    
					      <div className="clr"></div>
					    </div>
					    
					    <div className="gamesection01-top">
					     
						  <div id="framecontainer" ref="framecontainer">
						  	<iframe className='gameframe' allowtransparency='true' title={this.state.gameContent.title} scrolling='no' src={this.state.gameContent.url} frameBorder='0'></iframe>
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
					          <h6><a target="blank" href={this.state.gameContent.url}> <i class="fa fa-arrows-alt" aria-hidden="true"></i> Full Screen</a></h6>					
					        
					        <div className="clr"></div>
					       </div>
					       <div className="clr"></div>
					      </div>				      
					     
					      <div className="ratesection-bottom">
					        <div className="ratesection-bottom01">
					        </div>
					        <div className="ratesection-bottom02">
					         	<h6><a href="https://dtml.org/Home/Edubot"><img src={imageurl+"images/goto-pic.png"} alt="Edubot" /></a></h6>
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

