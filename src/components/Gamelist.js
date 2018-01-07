import React, { Component } from 'react';
import arrayShuffle from 'array-shuffle'
const imageurl="https://blog.dtml.org/games/";
var listcontent=[];

class Gamelist extends Component {
	constructor(props){
		super(props)
		this.state={
			searchstring: '',
			listcounter: 10,
			config : props.config
		}
	}
	componentDidMount()
	{
	}
	
	componentWillMount() {
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
		if (this.state.config != null)
		{
		var counter=0;
        var that = this;		
		  listcontent= arrayShuffle(this.state.config.games).map((listItem, i) => {
			counter++;
			if(counter<=that.state.listcounter){
				if((listItem.title.indexOf(that.state.searchstring)!=-1) || (listItem.description.indexOf(that.state.searchstring)!=-1)){
					return(
				        <div className="contentsection-main-middle-box" key={i}>
				           <div className="imgsec"><img src={imageurl + listItem.image} alt={this.state.config.playgame} /></div>
				           <h3>{listItem.title}</h3>
				           <p>{listItem.description}</p>
				           <h6><a onClick={that.gameSelected.bind(that, listItem)}>{this.state.config.playgame}</a></h6>
				        </div>
					)
				}
			}
		})
		return (
		  <div>
			<div className="bannersection">
			  <img src={imageurl + 'images/banner01.jpg'} alt="Banner" />
			</div>

			<div className="contentsection">
				<div className="contentsection-main">
				  <div className="contentsection-main-top">
				    <h6>{this.state.config.title}</h6>
				      <div className="contentsection-main-top01">
				         <div className="contentsection-main-top01-main">
				           <div className="contentsection-main-top01-mainin">
				               <input name="" type="text" onKeyUp={this.searchChange.bind(this)} placeholder={this.state.config.findlesson} />
				               <input name="" type="submit" value={this.state.config.search} />
				           <div className="clr"></div>
				           </div>
				         </div>
				      </div>
				  </div>
				  <div className="contentsection-main-middle">

				  	{listcontent}


		     	  	<h5><a onClick={this.showMore.bind(this)}>{this.state.config.more}</a></h5>
		    		<div className="clr"></div>
				  </div>
				  <div className="sponsors-setion">
				 		<h6><a href="https://dtml.org/Home/CorporateSponsor">{this.state.config.sponsors}</a></h6>
				  </div>
				</div>
			</div>
		  </div>
		);
	}
		 else
		 return null;
	}
}

export default Gamelist;