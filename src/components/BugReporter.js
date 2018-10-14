import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import '../css/BugReporter.css';
import postal from 'postal';
import 'bootstrap/dist/css/bootstrap.min.css';

class BugReporterContainer extends React.Component{
constructor () {
        super()
        this.state = {
            isHidden: true
        }
        this.channel = postal.channel('BugReporterVisibility');
        this.toggleHidden = this.toggleHidden.bind(this);
        this.hideToggle = this.hideToggle.bind(this);
        this.channel.subscribe( "togglevisibility", this.toggleHidden);
        this.channel.subscribe( "hidebar", this.hideToggle);
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    hideToggle(){
        this.setState({isHidden: true});
    }
    render () {
        return (
            <div>
            {!this.state.isHidden && <BugReporter serverURL="https://dtml.org/api/UserService/RecordUserActivity"/>}
            </div>
        )
    }
 }

class BugReporter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      loading: false,
      visible: false
    };

    this.onMessageChange = this.onMessageChange.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.channel = postal.channel('BugReporterVisibility');
  }

  onMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  async submit() {
    const { message, loading, visible} = this.state;

    this.setState({
      loading: true
    });

    try {
     
      await axios.get(this.props.serverURL, {
        params:{
            "eventType":"UserFeedbackSubmited",
            "EventData":{
                "feedback":message
            }
        }
      });

      alert('report_sent');

    } catch (err) {
      console.error(err);
      alert('error_sending');
    }

    this.setState({
      message: '',
      loading: false
    });
  }

  cancel() {
    this.setState({
      message: ''
    });
    this.channel.publish("hidebar");
  }

  render() {

    return (
      <div id="bug-reporter" className={classNames({ 'bug-reporter-loader': this.state.loading })}>
        <div className="title" class="label label-default">
          Bug reporter
        </div>

        <div className="field-group message-input">
          <label htmlFor="message" class="label label-default" >Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            rows="1"
            value={this.state.message}
            onChange={this.onMessageChange}
          />
        </div>

        <div className="buttons-group">
          <div className="field-group submit-input">
            <button
              type="button"
              disabled={this.state.message === ''}
              onClick={this.submit} class="btn btn-info"
            >
            Send
            </button>
          </div>

          <div className="field-group cancel-input">
            <button
              type="button"
              onClick={this.cancel} class = "btn btn-info"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

}

BugReporter.propTypes = {
  serverURL: PropTypes.string.isRequired
};

export default BugReporterContainer;
