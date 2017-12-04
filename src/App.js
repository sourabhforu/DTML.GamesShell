import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gamelist from './components/Gamelist';
import Gamecontent from './components/Gamecontent';


class App extends Component {
  render() {
 
    return (
      <div >
        <Header />
        <Gamelist />
        <Footer />
      </div>
    );
  }
}

export default App;
