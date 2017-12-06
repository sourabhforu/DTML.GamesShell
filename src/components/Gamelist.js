import React, { Component } from 'react';
import list from '../gamelist.json';

const imageurl=process.env.PUBLIC_URL;
var listcontent=[];
class Gamelist extends Component {
	constructor(props){
		super(props)
		this.state={
			searchstring: '',
			listcounter: 10,
		}
	}
	componentWillMount(){
		
	}
	gameSelected(listItem){
		this.props.Selected(false, listItem)
	}
	searchChange(e){
		this.setState({searchstring: e.target.value,})
	}
	showMore(){
		this.setState({listcounter: this.state.listcounter+10})
	}
	render() {

		var searchstring= this.state.searchstring
		var counter=0;
		listcontent= list.map((listItem, i) => {
			counter++;
			if(counter<=this.state.listcounter){
				if((listItem.title.indexOf(searchstring)!=-1)||(listItem.description.indexOf(searchstring)!=-1)){
					return(
				        <div className="contentsection-main-middle-box" key={i}>
				           <div className="imgsec"><img src={imageurl + listItem.image} alt="" /></div>
				           <h3>{listItem.title}</h3>
				           <p>{listItem.description}</p>
				           <h6><a onClick={this.gameSelected.bind(this, listItem)}>play game</a></h6>
				        </div>
					)
				}
			}

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
				               <input name="" type="text" onKeyUp={this.searchChange.bind(this)} placeholder="Find Lesson" />
				               <input name="" type="submit" value="Search" />
				           <div className="clr"></div>
				           </div>
				         </div>
				      </div>
				  </div>
				  <div className="contentsection-main-middle">

				  	{listcontent}


		     	  	<h5><a onClick={this.showMore.bind(this)}>More Game</a></h5>
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
