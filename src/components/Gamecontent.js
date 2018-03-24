import React, { Component } from "react";
import Rater from "react-rater";
import ReactGA from "react-ga";
import { isEmpty } from "lodash";
import arrayShuffle from "array-shuffle";

const imageurl = `https://games.dtml.org/games/`;
const rankingURL = `https://dtml.org/api/RatingService/Rank`;

class Gamecontent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      rating: 0,
      gameContent: props.gameContent,
      frameText: ``,
      startTime: new Date().getTime()
    };
  }

  componentWillMount() {
    if (isEmpty(this.state.gameContent)) {
      const urlpath = window.location.pathname;
      const gameID = urlpath.substr(urlpath.lastIndexOf(`/`) + 1);
      if (
        isEmpty(this.props.config) ||
        isEmpty(this.props.config.games) ||
        typeof gameID === `undefined`
      ) {
        window.location.href = `https://games.dtml.org/games`;
        return;
      }

      const gameContent = this.props.config.games.find(
        game => game.id === gameID
      );
      console.log(gameContent);
      this.setState({ gameContent });
    }
  }

  componentDidMount() {
    ReactGA.pageview(window.location.hash);
    ReactGA.event({
      category: `Games`,
      action: `Game__${this.state.gameContent.id}`
    });
    const that = this;
    that.setState({ rating: this.state.gameContent.rating });
    document.title = `${
      this.state.gameContent.title
    }| DTML.org Educational Game`;
  }

  handleRate({ rating, type }) {
    if (type === `click`) {
      const url = `${rankingURL}/?key=${
        this.state.gameContent.id
      }&rank=${rating}`;
      fetch(url, {
        method: `post`,
        headers: {
          "Content-Type": `application/json`,
          Accept: `application/json, text/plain, */*`
        }
      });
    }
  }

  render() {
    let instruction = null;
    if (this.state.gameContent.instruction != null) {
      instruction = (
        <div>
          <div className="howtoplay">{this.props.config.howtoplay}</div>
          <p>{this.state.gameContent.instruction}</p>
        </div>
      );
    }
    return (
      <div>
        <div className="bannersection">
          <img
            src={`${imageurl}images/game-banner.jpg`}
            alt="{this.state.gameContent.title}"
          />
          <div className="bannersection01">
            <h2>{this.state.gameContent.title}</h2>
          </div>
        </div>

        <div className="contentsection gamecontent">
          <div className="contentsection-main">
            <div className="gamesection">
              <div className="gamesection01">
                <p>{this.state.gameContent.description}</p>
                {instruction}
                <div className="clr" />
              </div>

              <div className="gamesection01-top">
                <div id="framecontainer">
                  <iframe
                    className="gameframe"
                    allowTransparency="true"
                    title={this.state.gameContent.title}
                    scrolling="no"
                    src={this.state.gameContent.url}
                    frameBorder="0"
                  />
                </div>
              </div>

              <div className="ratesection">
                <div className="ratesection-top">
                  <div className="ratesection-top-left">
                    <div>
                      <Rater
                        total={5}
                        rating={this.state.rating}
                        onRate={this.handleRate.bind(this)}
                      />
                    </div>

                    <div className="clr" />
                  </div>

                  <div className="ratesection-top-right">
                    <h6>
                      <a target="blank" href={this.state.gameContent.url}>
                        {` `}
                        <i className="fa fa-arrows-alt" aria-hidden="true" />
                        <span className="fullscreen">
                          {this.props.config.fullscreen}
                        </span>
                      </a>
                    </h6>
                    <h6>
                      <a target="blank" href="/games/">
                        {this.props.config.back}
                      </a>
                    </h6>
                    <div className="clr" />
                  </div>
                  <div className="clr" />
                </div>

                <div className="ratesection-bottom">
                  <div className="ratesection-bottom01" />
                  <div className="ratesection-bottom02">
                    <h6>
                      <a href="https://dtml.org/Home/Edubot">
                        <img
                          src={`${imageurl}images/goto-pic.png`}
                          alt="Edubot"
                        />
                      </a>
                    </h6>
                  </div>
                  <div className="clr" />
                </div>
              </div>
            </div>
            <aside className="game-sidebar">
              {!this.state.loggedin && (
                <div className="game-login game-sidebar-box">
                  <p className="game-loginExplainer">
                    Login to use the full power of our platform, earn badges,
                    and make games adapt to your learning style.
                  </p>
                  <p>
                    <a
                      className="game-loginButton"
                      href={`https://dtml.org/Account/Login?ReturnUrl=${
                        window.location.href
                      }`}
                    >
                      {this.props.config.login}
                    </a>
                  </p>
                </div>
              )}

              {this.state.gameContent.leaderboard && (
                <div className="game-leaderboard game-sidebar-box">
                  <h3>Top Scores:</h3>
                  {this.state.gameContent.leaderboard.map((leader, i) => {
                    const j = i + 1;
                    return (
                      <div key={`leader-${j}`} className="leader-score">
                        {`${leader.UserName}: ${leader.Score}`}
                      </div>
                    );
                  })}
                </div>
              )}

              {this.props.config.games && (
                <div className="game-relatedGames game-sidebar-box">
                  <h3>Related Games</h3>

                  {// shuffle all games, remove our current game, trim to 3 games, then display them
                  arrayShuffle(this.props.config.games || [])
                    .filter(game => game.id !== this.state.gameContent.id)
                    .slice(0, 3)
                    .map((game, i) => {
                      const j = i + 1;
                      return (
                        <div key={`game-${j}`} className="related-game">
                          <a href={`/games/${game.id}`}>{game.title}</a>
                        </div>
                      );
                    })}
                </div>
              )}

              <div className="game-register game-sidebar-box">
                <p className="game-registerExplainer">
                  Are you a teacher or instructor? Register your school to
                  leverage reporting and customization capabilities, monitor
                  progress of your students, and more!
                </p>
                <p>
                  <a
                    className="game-registerButton"
                    href="https://dtml.org/Registration/Organization"
                  >
                    Register Your School
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default Gamecontent;
