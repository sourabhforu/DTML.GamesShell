import React, { Component } from 'react';
import '../css/style.css';

import banner from '../images/banner01.jpg';

class Gamelist extends Component {
  render() {
 
    return (
      <div>
		<div className="bannersection">
		  <img src={banner} alt="" />
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
