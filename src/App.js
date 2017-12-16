import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import Header from './components/Header';
import Footer from './components/Footer';
import Gamelist from './components/Gamelist';
import Gamecontent from './components/Gamecontent';
import './css/style.css';
import './css/font-awesome.min.css';
import './css/responsive.css';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

ReactGA.initialize('UA-80531313-1'); 
const imageurl="http://blog.dtml.org/games/";
const url = 'https://dtml.org/api/ConfigurationService/GetGamesList?mkt=';

class App extends Component {
	constructor(){
		super()
	    this.state={
	      done: true,
	      gameContent: [],
	    }
		
		ReactGA.pageview(window.location.hash);
		ReactPixel.init('1648707511827840');
	}
	
	componentWillMount(){
	document.title = "Distance Teaching and Mobile Learning - Educational Games";
	var userLang = navigator.language || navigator.userLanguage;
    this.setState({ userLanguage: userLang })
     var that = this;
	   fetch(url+userLang)
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
	
	onSelectedGame(newdone, newContent){
		this.setState({done: newdone})
		this.setState({gameContent: newContent})
		window.scrollTo(0,0)
		ReactGA.event({
            category: 'Navigation',
            action: 'Game selected',
        });
	}
	onBack(newdone){
		this.setState({done: newdone})
		window.scrollTo(0,0)
	}
	render() {
		var condif = this.state.done
		if (this.state.config != null)
		{
		return (

		  <div >
			<ScrollToTop showUnder={160} easing="linear">
			  <img src={ imageurl+ 'images/backto-top.png'} alt="Back to top" className="back-top fa" />
			</ScrollToTop>
		    <Header config={this.state.config} />
			{ condif ?
				<Gamelist Selected={this.onSelectedGame.bind(this)} config={this.state.config}/> :
				<Gamecontent Back={this.onBack.bind(this)} gameContent={this.state.gameContent} config={this.state.config}/>
			}
		    <Footer config={this.state.config} />
		  </div>
		);
		}
		 else
			 return null;
	}
}

export default App;