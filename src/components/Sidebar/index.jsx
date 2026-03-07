import {Component} from "react"
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaHotjar} from 'react-icons/fa'
import {IoLogoGameControllerB} from 'react-icons/io'
import {MdPlaylistAdd} from 'react-icons/md'

import './index.css'
import SavedContext from "../../context/SavedContext"

//   const sidebarLinkItem = theme ? 'light-link-item' : 'dark-link-item'

class Sidebar extends Component {
  
  render(){
    const {theme} = this.props
    const sidebarBgContainer = theme
      ? 'light-sidebar-bg-container'
      : 'dark-sidebar-bg-container'
    const sidebarIcon = theme ? 'light-icon' : 'dark-icon'
    const sidebarPara = theme ? 'light-para' : 'dark-para'
    return (
      <SavedContext.Consumer>
        {value => {
          const {active,changeActive} = value
          const clickTheSavedVideos=()=>(
            changeActive("savedVideos")
          )
          const clickTheHome=()=>(
            changeActive("home")
          )
          const clickTheTrending=()=>(
            changeActive("trending")
          )
          const clickTheGaming=()=>(
            changeActive("gaming")
          )

          const homeIcon = active === "home" ? "active-icon" : sidebarIcon
          const trendingIcon = active === "trending" ? "active-icon" : sidebarIcon
          const gamingIcon = active === "gaming" ? "active-icon" : sidebarIcon
          const savedVideosIcon = active === "savedVideos" ? "active-icon" : sidebarIcon
          return(
            <div className={sidebarBgContainer}>
              <ul className="sidebar-list-container">
                <Link to="/" className="light-link-item">
                  <li className="list-item" onClick={clickTheHome}>
                    <AiFillHome size="20" className={homeIcon} />
                    <p className={sidebarPara}>Home</p>
                  </li>
                </Link>
                <Link to="/trending" className="light-link-item">
                  <li className="list-item" onClick={clickTheTrending}>
                    <FaHotjar size="20" className={trendingIcon} />
                    <p className={sidebarPara}>Trending</p>
                  </li>
                </Link>
                <Link to="/gaming" className="light-link-item">
                  <li className="list-item" onClick={clickTheGaming}>
                    <IoLogoGameControllerB size="20" className={gamingIcon} />
                    <p className={sidebarPara}>Gaming</p>
                  </li>
                </Link>
                <Link to="/saved-videos" className="light-link-item">
                  <li className="list-item" onClick={clickTheSavedVideos}>
                    <MdPlaylistAdd size="20" className={savedVideosIcon} />
                    <p className={sidebarPara}>Saved videos</p>
                  </li>
                </Link>
              </ul>
              <div className="sidebar-bottom-container">
                <p>CONTACT US</p>
                <div className="icons-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="sidebar-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="sidebar-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="sidebar-icon"
                  />
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}
export default Sidebar
