// Distance Teaching and Mobile Learning
// ReactJS Three column shell layout SPA website
// Website content and configuration is provided in gamelist.json file
//-----------------------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import Social from './social.js';
import list from './gamelist.json';
import Rater from 'react-rater'
import './App.css';

// Main application class 
class App extends Component {
   componentDidMount() {
    document.title = "Distance Teaching and Mobile Learning | Free educational Games online";
  }
  render() {
    return (
	 <div>
            <Header/> 
            <Body list={list}/> 
	    <Footer/>	 
	  </div>
    );
   }
  }

// Navigational pane. 
// Links are generated from gamelist.json file 
class LeftNav extends Component {
    render() {
	var that = this;
    return (
        <ul>
          {this.props.data.map(function(listValue, i){
            return <li><a href='#' class={listValue.active ? 'notactiveClass navLink' : 'activeClass navLink'} onClick={() => {that.props.click(i)}}>{listValue.name}</a></li>;
          })}
        </ul>
      )
    }
  };

// Main content area with three column layout
class Body extends Component {
      constructor(props) {
      super(props);
      this.state = {
         currentLesson: 0,
	 displayCode: false
      }	  
	  this.updateState = this.updateState.bind(this);
	  this.toggleCode = this.toggleCode.bind(this);
  };
  
  // Enent handler for getCode button click, to display textarea with IFrame code	
  toggleCode() {        
    var domNode = this.refs.framecontainer;
    var frameCode = domNode.innerHTML+"<div><a href='http://dtml.org'>Game provided by dtml.org</a></div>";
    this.setState({displayCode: true});
    this.setState({frameText: frameCode});		
  }
  
  // Navigation Link Click. Game area is updated with the new game	
  updateState(index){
    this.setState({displayCode: false}); 
    this.setState({currentLesson: index});
    this.props.list.map(function(item, i){item.active = false; return true;});        
    this.props.list[index].active = true;	  
   };
   
  render() {
    return (
      <div class="bodyContainer">
      <div class="row">
      <div class="col-sm-2 col-md-2 nav">
	    <section id="content">
	   	<h4>ESL Games</h4>
		  <LeftNav data={this.props.list} click={this.updateState}/>
     	</section>	
	   </div>
	    <div class="col-sm-6 col-md-8 main">
    	<section id="middle">
		  <h4>{this.props.list[this.state.currentLesson].title}</h4>
		  <p>{this.props.list[this.state.currentLesson].description}</p>
		  <Social />
		  <div id="framecontainer" ref="framecontainer">
		  <iframe class='gameframe' title={this.props.list[this.state.currentLesson].title} src={this.props.list[this.state.currentLesson].url} width='100%' height="600" frameborder='0'></iframe>
		  </div>
		  <div>
		  <span>Rate this game </span>
	   	<Rater total={5} rating={2} />
		</div>
		
		<button onClick={() => {this.toggleCode()}} type="button" class="btn btn-info getcode	">&lt;/&gt; Embed</button>
			{this.state.displayCode ? 
			<textarea id='codeArea' class='codearea'>{this.state.frameText}</textarea>		
			: null
			}	
                <button onClick={() => {window.location.href='http://blog.dtml.org/contact'}} type="button" class="btn btn-info getcode	">Contribute</button>
	</section>
 	</div>
	<div class="col-sm-2 col-md-2 right">
		<section class='d-none d-lg-block'>
		<a href="https://dtml.org/home/donate">
		<img src='https://dtml.org/images/ad2.png' alt="Sponsored Link" />
		</a>
        </section>
	</div>
	</div>
	</div>
    );
  }
}

 // Header with DTML logo and main site links
class Header extends Component {
  render() {
    return (
 <header class="blog-header">
            <div class="container">
                <nav class="d-flex">
                    <h1 class="blog-logo my-auto">
                         <a href="http://blog.dtml.org/">

	    <img src="http://blog.dtml.org/Custom/Themes/clean/src/img/logo.png" alt="Distance Teaching and Mobile Learning" />
                        </a>
                    </h1>
                    <ul class="blog-nav ml-lg-auto d-lg-block d-lg-flex my-lg-auto">
                        <li><a href="https://dtml.org">Home</a></li>
			 <li><a href="https://dtml.org/Home/Donate">Donate</a></li>
                        <li>
                                <a href="http://blog.dtml.org/page/meet-our-students">Meet our students</a>                             

                            </li>
                        
                        <li><a href="https://dtml.org/Home/Shopforgood">Shop for Good</a></li>
                        <li><a href="http://blog.dtml.org/contact">Contact</a></li>
                    </ul>
                    <button class="blog-nav-toggle hamburger d-block d-lg-none ml-auto my-auto color-white hamburger--squeeze" type="button">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </nav>
            </div>
        </header>
    );
  }
}

// DTML footer with social links and DTML logo
class Footer extends Component {
  render() {
    return (
    <footer class="blog-footer">
            <div class="container">
                <div class="blog-footer-end d-lg-flex text-center text-lg-left ">
                    <div class="blog-copyright my-lg-auto mb-3 mb-lg-0">
                        <a class="blog-footer-logo" href="http://blog.dtml.org/">
                            <img src="http://blog.dtml.org/Custom/Themes/clean/src/img/logo.png" alt="Distance Teaching and Mobile Learning" />
                        </a>
                        <p>
                            <span>&copy; 2016-2018 All rights reserved.</span>
                        </p>
                    </div>
                    <ul class="nav blog-social my-lg-auto ml-lg-auto justify-content-center">
                        <li><a class="item-fb" data-toggle="tooltip" title="follow on Facebook" target="_blank" href="https://www.facebook.com/distantteaching/" rel="external nofollow noopener noreferrer"><i class="fa fa-facebook"></i></a></li>
                        <li><a class="item-tw" data-toggle="tooltip" title="follow on Twitter" target="_blank" href="https://twitter.com/DistantTeaching" rel="external nofollow noopener noreferrer"><i class="fa fa-twitter"></i></a></li>
                        <li><a class="item-li" data-toggle="tooltip" title="follow on Linkedin" target="_blank" href="https://www.linkedin.com/company/distant-teaching-and-mobile-learning/" rel="external nofollow noopener noreferrer"><i class="fa fa-linkedin"></i></a></li>
                        <li><a class="item-yt" data-toggle="tooltip" title="follow on YouTube" target="_blank" href="https://www.youtube.com/channel/UCwF13kloyxnifaNCHQUL2rQ/featured" rel="external nofollow noopener noreferrer"><i class="fa fa-youtube"></i></a></li>
                        <li><a class="item-up" data-toggle="tooltip" title="Back up" id="back-up" target="_blank" rel="noopener noreferrer" href="http://blog.dtml.org"><i class="fa fa-chevron-up"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
  }
}

export default App;
export  {Header};
export  {Footer};
export  {Body};
