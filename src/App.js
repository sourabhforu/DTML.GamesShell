import React, { Component } from 'react';

import ScrollToTop from 'react-scroll-up';
import Header from './components/Header';
import Footer from './components/Footer';
import Gamelist from './components/Gamelist';
import Gamecontent from './components/Gamecontent';
import './css/style.css';
import './css/font-awesome.min.css';
import './css/responsive.css';


const imageurl=process.env.PUBLIC_URL;
class App extends Component {
	constructor(){
		super()
	    this.state={
	      done: true,
	      gameContent: [],
	    }
	}
	componentWillMount(){
		
	}
	onSelectedGame(newdone, newContent){
		this.setState({done: newdone})
		this.setState({gameContent: newContent})
		window.scrollTo(0,0)
	}
	onBack(newdone){
		this.setState({done: newdone})
		window.scrollTo(0,0)
	}
	render() {
		var condif = this.state.done
		return (
		  <div >
			<ScrollToTop showUnder={160} easing="linear">
			  <img src={ imageurl+ 'images/backto-top.png'} alt="" className="back-top fa" />
			</ScrollToTop>
		    <Header />
			{ condif ?
				<Gamelist Selected={this.onSelectedGame.bind(this)}/> :
				<Gamecontent Back={this.onBack.bind(this)} gameContent={this.state.gameContent}/>
			}
		    <Footer />
		  </div>
		);
	}
}

export default App;