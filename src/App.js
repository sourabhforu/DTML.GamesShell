import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import Header from './components/Header';
import Footer from './components/Footer';
import Gamelist from './components/Gamelist';
import Gamecontent from './components/Gamecontent';
import './css/style.css';
import './css/font-awesome.min.css';
import './css/responsive.css';

ReactGA.initialize('UA-80531313-1'); 
ReactPixel.init('1648707511827840');
	
const imageurl="https://games.dtml.org/games/";
const url = 'https://dtml.org/api/ConfigurationService/GetGamesList?mkt=';
const queryString = require('query-string');

class App extends Component {

	constructor() {
		super()
    this.state = {
      done: true,
      gameContent: [],
    }		
		ReactGA.pageview(window.location.hash);
	}
	
	componentWillMount() {
	document.title = "Distance Teaching and Mobile Learning - Educational Games";
	var userLang = navigator.language || navigator.userLanguage;
    this.setState({ userLanguage: userLang })
    var that = this;
	const parsed = queryString.parse(window.location.search);
	var fullURL =url+userLang + '&orgid=' + parsed.school;
	
	  fetch(fullURL)
	    .then(function(response) {
				if (response.status >= 400) {
				  throw new Error("Bad response from server");
				}		
				return response.json();
	  	})
	  	.then(function(data) {
		  	that.setState({ config: data })
	  	});		
	}
	
	onSelectedGame(newdone, newContent) {
		this.setState({done: newdone})
		this.setState({gameContent: newContent})
		window.scrollTo(0,0)
		ReactGA.event({
      category: 'Navigation',
      action: 'Game selected',
    });
	}

	render() {
		if (this.state.config != null) {
			return (
				<Router basename="/games">
				  <div>
						<ScrollToTop showUnder={160} easing="linear" style={{zIndex: 9999}}>
						  <img src={ imageurl+ 'images/backto-top.png'} alt="Back to top" className="back-top fa" />
						</ScrollToTop>
					  <Header config={this.state.config} />
					  <Route exact path='/' component={() => <Gamelist config={this.state.config} Selected={this.onSelectedGame.bind(this)} />} />
					  <Route exact path='/:gameId' component={() => <Gamecontent gameContent={this.state.gameContent} config={this.state.config} />} />
					  <Footer config={this.state.config} />
				  </div>
				 </Router>
			);
		}
		else
			return null;
	}
}

export default App;