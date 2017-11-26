import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils'; 
import App from './App';
import Header from './App';
import Footer from './App';
import Body from './App';
import {expect} from 'chai';
import {data} from './gamelist.json';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should render header (DOM class matching)', () => {
    const list = renderIntoDocument(<Header />);
    const items = findDOMNode(list).querySelectorAll('.blog-logo');
    expect(items.length).to.equal(1);
  });  

it('should render footer with social links (DOM class matching)', () => {
    const list = renderIntoDocument(<Footer />);
    const items = findDOMNode(list).querySelectorAll('.blog-footer');
    expect(items.length).to.equal(1);
  });

it('should render body even without list (DOM class matching)', () => {
    const list = renderIntoDocument(<Body />);
    const bodyContainer = findDOMNode(list).querySelectorAll('.bodyContainer');
	const activeClass = findDOMNode(list).querySelectorAll('.activeClass');
    expect(bodyContainer.length).to.equal(1);
  });
  
it('should render bodywith the list (DOM class matching)', () => {
	const list = renderIntoDocument(<Body list={data} />);
    const bodyContainer = findDOMNode(list).querySelectorAll('.bodyContainer');
	const activeClass = findDOMNode(list).querySelectorAll('.activeClass');
    expect(bodyContainer.length).to.equal(1);
	expect(activeClass.length).to.equal(1);
  });