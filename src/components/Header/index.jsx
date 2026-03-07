import {Component} from 'react'

import {Link, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Popup} from 'reactjs-popup'

import {FaMoon} from 'react-icons/fa'
import {FiMenu, FiLogOut} from 'react-icons/fi'
import {BsBrightnessHighFill} from 'react-icons/bs'
import './index.css'
import SavedContext from '../../context/SavedContext'
import withRouter from '../withRouter'


class Header extends Component {
  clickLogout = () => {
    Cookies.remove('jwt_token')
    this.props.navigate("/login", {replace : true})
    
  }

  render() {
    return (
      <SavedContext.Consumer>
        {value => {
          const {clickTheTheme, theme} = value
          const themeIcon = theme ? 'theme-icon-light' : 'theme-icon-dark'
          const homeBgContainer = theme ? 'white-theme' : 'black-theme'
          const popupContainer = theme
            ? 'light-popup-container'
            : 'dark-popup-container'

          const changeTheTheme = () => {
            clickTheTheme()
          }
          return (
            <nav className={`navbar ${homeBgContainer}`}>
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  className="website-logo-header"
                  alt="website logo"
                />
              </Link>
              <div className="header-right-container-desktop">
                {theme ? (
                  <button
                    type="button"
                    data-testid="theme"
                    className={`logout-icon ${themeIcon}`}
                    onClick={changeTheTheme}
                  >
                    <FaMoon size="30" className="moon-icon" />
                  </button>
                ) : (
                  <button
                    type="button"
                    data-testid="theme"
                    className={`logout-icon ${themeIcon}`}
                    onClick={changeTheTheme}
                  >
                    <BsBrightnessHighFill size="30" className="chintu"/>
                  </button>
                )}

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile"
                />
                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-button">
                      Logout
                    </button>
                  }
                  position="center center"
                >
                  {close => (
                    <div className={popupContainer}>
                      <p>Are you sure, you want to logout?</p>
                      <button
                        type="button"
                        className="cancel"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="confirm"
                        onClick={this.clickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
              <div className="header-right-container-mobile">
                {theme ? (
                  <button
                    type="button"
                    data-testid="theme"
                    className={`logout-icon ${themeIcon}`}
                    onClick={changeTheTheme}
                  >
                    <FaMoon size="30" className="moon-icon" />
                  </button>
                ) : (
                  <button
                    type="button"
                    data-testid="theme"
                    className={`logout-icon ${themeIcon}`}
                    onClick={changeTheTheme}
                  >
                    <BsBrightnessHighFill size="30" />
                  </button>
                )}
                <FiMenu size="30" />
                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-icon">
                      <FiLogOut size="30" />
                    </button>
                  }
                  className="popup-content"
                  position="center center"
                >
                  {close => (
                    <div className="popup-container">
                      <p>Are you sure, you want to logout?</p>
                      <button
                        type="button"
                        className="cancel"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="confirm"
                        onClick={this.clickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </nav>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

const HeaderWithRouter = withRouter(Header)

export default HeaderWithRouter
