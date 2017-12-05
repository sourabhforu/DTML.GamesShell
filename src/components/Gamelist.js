import React, { Component } from 'react';
import list from '../gamelist.json';
import '../css/style.css';

const imageurl=process.env.PUBLIC_URL;
class Gamelist extends Component {
	constructor(props){
		super(props)
	}
	gameSelected(listItem){
		this.props.Selected(false, listItem)
	}
	render() {
		const listcontent= list.map((listItem, i) => {
			return(
		        <div className="contentsection-main-middle-box" key={i}>
		           <div className="imgsec"><img src={imageurl + listItem.image} alt="" /></div>
		           <h3>{listItem.title}</h3>
		           <p>{listItem.description}</p>
		           <h6><a onClick={this.gameSelected.bind(this, listItem)}>play game</a></h6>
		        </div>
				)
		})

		return (
		  <div>
			<div className="bannersection">
			  <img src={imageurl + 'images/banner01.jpg'} alt="" />
			</div>

			<div className="contentsection">
				<div className="contentsection-main">
				  <div className="contentsection-main-top">
				    <h6>Distance Teaching and Mobile Learning online Curriculum consists of e-lessons in English or Spanish and targets students from 1st to 5th grades. </h6>
				      <div className="contentsection-main-top01">
				         <div className="contentsection-main-top01-main">
				           <div className="contentsection-main-top01-mainin">
				               <input name="" type="text" placeholder="Find Lesson" />
				               <input name="" type="submit" value="Search" />
				           <div className="clr"></div>
				           </div>
				         </div>
				      </div>
				  </div>
				  <div className="contentsection-main-middle">

				  	{listcontent}


		     	  	<h5><a href="#">More Game</a></h5>
		    		<div className="clr"></div>
				  </div>
				  <div className="sponsors-setion">
				 		<h6><a href="#">Our Sponsors</a></h6>
				  </div>
				</div>
			</div>


		  </div>
		);
	}
}

export default Gamelist;
