import React, { Component } from 'react';
import Social from '../social.js';
import Rater from 'react-rater'
import '../css/style.css';


const imageurl=process.env.PUBLIC_URL;
class Gamecontent extends Component {
  constructor(props){
  	super(props)
  	this.state={
  		rating:3,
  	}
  }
  clickBack(){
  	this.props.Back(true)
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

			<div className="contentsection" style={{'marginBottom':'-150px'}}>
				<div className="contentsection-main">
				 
				  <div className="gamesection">
				    <div className="gamesection01">
				      <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum dapibus ipsum, nec dignissim</h2>
				      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus quis nisi dui. Quisque semper est nec dui pellentesque dictum. Cras convallis non urna luctus molestie. Cras dignissim lorem augue, a sodales dolor aliquet quis. Mauris at leo sit amet lacus ullamcorper auctor. Curabitur sodales sapien odio, id viverra nisl bibendum vel. Phasellus vestibulum ex et erat posuere, </p>
				    
				      <Social />
				      <div className="clr"></div>
				    </div>
				    
				    <div className="gamesection01-top">
				      <div className="imgsec"><img src={imageurl+"images/gamevideo-pic.jpg"} alt="" /></div>
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
				        <h6><a href="javascript:void(0)" className="embed-link"> &lt;/&gt; Embed</a></h6>
				        <h6><a href="#">Contribute</a></h6>
				        <div className="clr"></div>
				       </div>
				       <div className="clr"></div>
				       
				       <textarea name="" cols="" rows="" placeholder="Embed Code" id="embed-code" style={{'display':'none'}}></textarea>
				       
				      </div>
				      
				     
				     <div className="ratesection-bottom">
				       <div className="ratesection-bottom01">
				         <h5><a onClick={this.clickBack.bind(this)}>Back to game List</a></h5>
				       </div>
				       <div className="ratesection-bottom02">
				         <h6><a href="#"><img src={imageurl+"images/goto-pic.png"} alt="" /></a></h6>
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
