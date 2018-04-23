/* The Distance Teaching and Mobile learning licenses this file
to you under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import React, { Component } from "react";
import { isEmpty, keys } from "lodash";

import "../css/style.css";

const imageurl = `https://games.dtml.org/games/`;
const loginURL = `https://dtml.org/Activity/GetUserName`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      username: ``
    };
  }

  componentDidMount() {
    const that = this;
    fetch(loginURL, { credentials: `include` })
      .then(response => {
        if (response.status >= 400) {
          console.log(`Bad response from server`);
          that.setState({ loggedin: false });
          window.store.loggedin = false;
        }
        return response.json();
      })
      .then(data => {
        that.setState({ username: data });
        window.store.username = data;
        if (data !== ``) {
          that.setState({ loggedin: true });
          window.store.loggedin = true;
        }
      })
      .catch(error => {
        console.log(`Request failed ${error}`);
      });
  }

  render() {
    let custom = [];
    let Logo;
    let logoImageUrl = `${imageurl}images/logo-main.jpg`;
    let menuColor = ``;
    if (!isEmpty(this.props.config.customization)) {
      custom = this.props.config.customization;
      logoImageUrl = custom.logoURL;
      menuColor = custom.MenueColor;
    }

    if (logoImageUrl !== ``) {
      Logo = (
        <a href="https://dtml.org">
          <img src={logoImageUrl} alt="DTML Logo" style={{ height: `37px` }} />
        </a>
      );
    }

    return (
      <div>
        <div
          className="logosection"
          style={!isEmpty(menuColor) ? { background: menuColor } : null}
        >
          <div className="logosection-main">
            <div className="logosection-main-left">{Logo}</div>

            {!this.state.loggedin ? (
              <div className="logosection-main-right">
                <div className="logosection-main-right01">
                  {!this.props.config.customization ? (
                    <ul>
                      <li>
                        <a href="https://dtml.org/Home/Shopforgood#!/men?q=D1">{this.props.config.shop}</a>
                      </li>
					 <li>
                        <a href="https://dtml.org">{this.props.config.home}</a>
                      </li>
                      <li>
                        <a href="https://blog.dtml.org">
                          {this.props.config.blog}
                        </a>
                      </li>
                      <li>
                        <a href="https://games.dtml.org/games">
                          {this.props.config.game}
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      {keys(custom.Menue).map(key => (
                        <li>
                          <a href={custom.Menue[key].Value}>
                            {custom.Menue[key].Key}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="logosection-main-right02">
                  <h6>
                    <a
                      href={`https://dtml.org/Account/Login?ReturnUrl=${
                        window.location.href
                      }`}
                    >
                      {this.props.config.login}
                    </a>
                  </h6>
                </div>
              </div>
            ) : (
              <div className="logosection-main-right">
                <div className="logosection-main-right01">
                  <ul>
                    <li>
                      {` `}
                      <a href="https://dtml.org/Student/PersonalProfile">
                        {this.props.config.hello}, {this.state.username}
                      </a>
                    </li>
                    <li>
                      <a href="https://dtml.org/Student/PersonalProfile">
                        {this.props.config.profile}
                      </a>
                    </li>
                    <li>
                      <a href="https://games.dtml.org/games">
                        {this.props.config.game}
                      </a>
                    </li>
                    <li>
                      <a href="https://dtml.org/Account/LogOffExternal">
                        {this.props.config.logoff}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
