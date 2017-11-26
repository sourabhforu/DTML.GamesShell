import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import Social from './social.js';
import list from './gamelist.json';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import Rater from 'react-rater'




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

class LeftNav extends Component {
    render() {
	var that = this;
    return (
        <ul>
          {this.props.data.map(function(listValue, i){
            return <li><a href='#' class={listValue.active ? 'notactiveClass' : 'activeClass'} onClick={() => {that.props.click(i)}}>{listValue.name}</a></li>;
          })}
        </ul>
      )
    }
  };

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
  
  toggleCode()
  {
        var domNode = this.refs.framecontainer;
		var frameCode = domNode.innerHTML+"<div><a href='http://dtml.org'>Game provided by dtml.org</a></div>";
	    this.setState({displayCode: true});
		this.setState({frameText: frameCode});		
  }
   
    updateState(index) {
    this.setState({displayCode: false}); 
	this.setState({currentLesson: index});
	  this.props.list.map(function(item, i){item.active = false;});        
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
		<iframe class='gameframe' src={this.props.list[this.state.currentLesson].url} width='100%' height="600" frameborder='0'></iframe>
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
			
			<button onClick={() => {window.location.href='http://blog.dtml.org/contact'}} type="button" class="btn btn-info getcode	"> <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>Contribute</button>
			
	</section>
	
	</div>
	<div class="col-sm-2 col-md-2 right">
		<section class='d-none d-lg-block'>
		<img src='https://dtml.org/images/ad2.png' />
		</section>
	</div>
	</div>
	</div>
    );
  }
}

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
                        <li><a class="item-fb" data-toggle="tooltip" title="follow on Facebook" target="_blank" href="https://www.facebook.com/distantteaching/" rel="external nofollow"><i class="fa fa-facebook"></i></a></li>
                        <li><a class="item-tw" data-toggle="tooltip" title="follow on Twitter" target="_blank" href="https://twitter.com/DistantTeaching" rel="external nofollow"><i class="fa fa-twitter"></i></a></li>
                        <li><a class="item-li" data-toggle="tooltip" title="follow on Linkedin" target="_blank" href="https://www.linkedin.com/company/distant-teaching-and-mobile-learning/" rel="external nofollow"><i class="fa fa-linkedin"></i></a></li>
                        <li><a class="item-yt" data-toggle="tooltip" title="follow on YouTube" target="_blank" href="https://www.youtube.com/channel/UCwF13kloyxnifaNCHQUL2rQ/featured" rel="external nofollow"><i class="fa fa-youtube"></i></a></li>
                        <li><a class="item-up" data-toggle="tooltip" title="Back up" id="back-up" target="_blank" href="#"><i class="fa fa-chevron-up"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
  }
}

export default App;
