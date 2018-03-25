import React, { Component } from "react";
import Rater from "react-rater";
import arrayShuffle from "array-shuffle";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

const imageurl = `https://games.dtml.org/games/`;
let listcontent = [];

const getFirstLine = str => {
  if (str == null || typeof str === `undefined`) return ``;
  const p1 = str.indexOf(`.`);
  const p2 = str.indexOf(`…`);
  let breakIndex = p1 > 0 ? (p2 > 0 ? Math.min(p1, p2) : p1) : p2 > 0 ? p2 : -1;

  if (breakIndex === -1) {
    breakIndex = str.indexOf(`!`);
    if (breakIndex === -1) {
      return str;
    }
  }
  return str.substr(0, breakIndex + 1);
};

let gamesList = [];

class Gamelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchstring: ``,
      listcounter: 12,
      config: props.config,
      sortProperty: `initial`
    };
    gamesList = props.config.games;
    this.sortGamesArray(`random`);
  }

  gameSelected(listItem) {
    this.props.Selected(false, listItem);
  }

  searchChange(e) {
    this.setState({ searchstring: e.target.value });
  }

  showMore() {
    this.setState({ listcounter: this.state.listcounter + 10 });
  }

  sortChange(sortParameter) {
    this.sortGamesArray(sortParameter);
  }

  sortGamesArray(sortParameter = `random`) {
    if (sortParameter !== this.state.sortProperty) {
      this.setState({ sortProperty: sortParameter });
      if (sortParameter === `rating`) {
        gamesList.sort((a, b) => b.rating - a.rating || b.title - a.title);
      } else if (sortParameter === `complexity`) {
        gamesList.sort(
          (a, b) => a.complexity - b.complexity || b.title - a.title
        );
      } else {
        gamesList = arrayShuffle(gamesList);
      }
    }
  }

  render() {
    let bannerImageUrl = `${imageurl}images/banner01.jpg`;

    if (!isEmpty(this.state.config.customization)) {
      const custom = this.state.config.customization;
      bannerImageUrl = custom.BannerURL;
    }
    if (!isEmpty(this.state.config)) {
      let counter = 0;
      const that = this;

      listcontent = gamesList.map(listItem => {
        counter += 1;
        if (
          counter <= that.state.listcounter &&
          (listItem.title.indexOf(that.state.searchstring) !== -1 ||
            listItem.description.indexOf(that.state.searchstring) !== -1)
        ) {
          return (
            <div className="contentsection-main-middle-box" key={counter}>
              <div className="game-content-top">
                <div className="imgsec">
                  <img
                    src={imageurl + listItem.image}
                    alt={this.state.config.playgame}
                  />
                </div>
                <h3>{listItem.title}</h3>
                <p>{getFirstLine(listItem.description)}</p>
              </div>

              <div className="game-content-middle">
                <Rater total={5} rating={listItem.rating} interactive={false} />
              </div>

              <div className="game-content-bottom">
                <h6>
                  <Link
                    onClick={that.gameSelected.bind(that, listItem)}
                    to={`/${listItem.id}`}
                  >
                    {this.state.config.playgame}
                  </Link>
                </h6>
              </div>
            </div>
          );
        }

        return null;
      });
    }

    return (
      <div>
        <div className="bannersection_list">
          <img src={bannerImageUrl} alt="Banner" />
        </div>
        <div className="contentsection">
          <div className="contentsection-main">
            <div className="contentsection-main-top">
              <h6>{this.state.config.title}</h6>
              <div className="contentsection-main-top01">
                <div className="contentsection-main-top01-main">
                  <div className="contentsection-main-top01-mainin">
                    <input
                      name=""
                      type="text"
                      onKeyUp={this.searchChange.bind(this)}
                      placeholder={this.state.config.findlesson}
                    />
                    <input
                      name=""
                      type="submit"
                      value={this.state.config.search}
                    />
                    <div className="clr" />
                  </div>
                </div>
                <div className="sort-buttons">
                  <button
                    className="sort-button"
                    onClick={() => this.sortChange(`rating`)}
                  >
                    <i className="fa fa-star" /> Sort by Rating
                  </button>
                  <button
                    className="sort-button"
                    onClick={() => this.sortChange(`complexity`)}
                  >
                    <i className="fa fa-cogs" /> Sort by Complexity
                  </button>
                </div>
              </div>
            </div>
            <div className="contentsection-main-middle">
              {listcontent}
              <h5>
                <button onClick={this.showMore.bind(this)}>
                  {this.state.config.more}
                </button>
              </h5>
              <div className="clr" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gamelist;
