import React, { Component } from 'react';
import Social from '../social.js';
import Rater from 'react-rater'


const imageurl="http://blog.dtml.org/games/";

class Gamecontent extends Component {
  constructor(props){
  	super(props)
  	this.state={
  		rating:3,
  		frameText: "",
  	}
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
  render() {
    return (
    	<div>
		
			<div className="bannersection">
				<img src={imageurl+"images/game-banner.png"} alt="" />
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
					  	<iframe className='gameframe' title={this.props.gameContent.title} src={this.props.gameContent.url} width='100%' height="600" frameBorder='0'></iframe>
					  </div>
				    </div>
				    


				    <div className="ratesection">
				      <div className="ratesection-top">
				        <div className="ratesection-top-left">

						  <div>
							  <h1 className="raterhead">Rate this game </h1>
						      <Rater total={5} rating={this.state.rating}/>
						  </div>


				       <div className="clr"></div>
				        </div>
				       
				       <div className="ratesection-top-right">
				        <h6><a className="embed-link" onClick={this.toggleCode.bind(this)}> &lt;/&gt; Embed</a></h6>

				
				        <h6><a href="https://github.com/seattleuser/DTML.GamesShell ">Contribute</a></h6>
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
				         <h5><a onClick={this.clickBack.bind(this)}>Back to game List</a></h5>
				       </div>
				       <div className="ratesection-bottom02">
				         <h6><a href="http://dtml.org/Home/Edubot"><img src={imageurl+"images/goto-pic.png"} alt="" /></a></h6>
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
