import React, { Component } from 'react';
import BugReporter from './BugReporterOriginal';
import "../css/style.css";
 
class MyBugReporter extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {'Submit FeedBack'}
        </button>
        {!this.state.isToggleOn && <Child />}
      </div>
    );
  }
}
 
const Child = () => (
<div className="BugReportHolder">
<BugReporter name="test" serverURL="http://localhost:4000/" />
</div>
)

export default MyBugReporter;