import React, { Component } from 'react'
import Rater from 'react-rater'
import ReactGA from 'react-ga'
import { isEmpty } from 'lodash'

const imageurl="https://games.dtml.org/games/";
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
    } 
  
  componentWillUnmount() {
    this.componentGracefulUnmount()
  }

  componentWillMount() {
  	if(isEmpty(this.state.gameContent)) {
  		var urlpath = window.location.pathname;
  		var gameID = urlpath.substr(urlpath.lastIndexOf('/')+1)
		if (isEmpty(this.props.config) || isEmpty(this.props.config.games) || typeof gameID === "undefined")
		{
			window.location.href = "https://games.dtml.org/games";
                        return;
		}

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
	  that.setState({ rating: this.state.gameContent.rating });
	  document.title = this.state.gameContent.title + "| DTML.org Educational Game";
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
	
    let instruction = null;
		if (this.state.gameContent.instruction != null)
	  {
      instruction = <div>
							        <div className="howtoplay">{this.props.config.howtoplay}</div>
								  		<p>{this.state.gameContent.instruction}</p>
	   								</div>;
	  }	  
    return (
    	<div>
				<div className="bannersection">
					<img src={imageurl+"images/game-banner.jpg"} alt="{this.state.gameContent.title}" />
					<div className="bannersection01">
						<h2>{this.state.gameContent.title}</h2>
					</div>  
				</div>

				<div className="contentsection gamecontent">
					<div className="contentsection-main">
					 
					  <div className="gamesection">
					    <div className="gamesection01">
					      <p>{this.state.gameContent.description}</p>
				          {instruction}
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
					          <h6><a target="blank" href={this.state.gameContent.url}> <i className="fa fa-arrows-alt" aria-hidden="true"></i><span className="fullscreen">{this.props.config.fullscreen}</span></a></h6>					
					        	<h6><a target="blank" href='/games/'>{this.props.config.back}</a></h6>
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

