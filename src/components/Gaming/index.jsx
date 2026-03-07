import {Component} from 'react'

import {Link} from 'react-router-dom'
import {Circles} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {IoLogoGameControllerB} from 'react-icons/io'
import SavedContext from '../../context/SavedContext'

import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

class Gaming extends Component {
  state = {
    status: '',
    videosList: [],
  }

  componentDidMount() {
    this.getTheVideos()
  }

  getTheVideos = async () => {
    this.setState({status: 'INPROGRESS'})

    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const videosList = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      this.setState({status: 'SUCCESS', videosList})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  renderTheLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Circles />
    </div>
  )

  renderTheYear = year => formatDistanceToNow(new Date(year))

  renderTheSuccessView = () => (
    <SavedContext.Consumer>
      {value => {
        const {theme} = value
        const homeBgContainer = theme
          ? 'light-home-bg-container'
          : 'dark-home-bg-container'
        const lightGameLinkItem = theme
          ? 'light-game-link-item'
          : 'dark-game-link-item'
        const {videosList} = this.state

        return (
          <div className={homeBgContainer} data-testid="gaming">
            <div className="trending-icon-container">
              <button type="button" className="trending-icon-button">
                <IoLogoGameControllerB size="30" className="trending-icon" />
              </button>
              <h1 className="sidebar-para">Gaming</h1>
            </div>
            <ul className="gaming-list-container">
              {videosList.map(eachItem => (
                <li key={eachItem.id} className="gaming-list-item">
                  <Link
                    to={`/videos/${eachItem.id}`}
                    className={lightGameLinkItem}
                  >
                    <img
                      src={eachItem.thumbnailUrl}
                      alt="video thumbnail"
                      className="gaming-thumbnail-url"
                    />
                    <div className="gaming-content">
                      <p className="trending-title">{eachItem.title}</p>
                      <p>{eachItem.viewCount}</p>
                      <p>World wide</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </SavedContext.Consumer>
  )

  clickTheRetryButton = () => {
    this.getTheVideos()
  }

  renderTheFailure = () => (
    <div className="failure-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.clickTheRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderTheStatus = () => {
    const {status} = this.state
    switch (status) {
      case 'INPROGRESS':
        return this.renderTheLoading()
      case 'SUCCESS':
        return this.renderTheSuccessView()
      case 'FAILURE':
        return this.renderTheFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <SavedContext.Consumer>
        {value => {
          const {theme} = value
          const homeBgContainer = theme
            ? 'light-home-bg-container'
            : 'dark-home-bg-container'
          return (
            <div className={homeBgContainer}>
              <Header />
              <div className="trending-bottom-container">
                <div className="trending-sidebar-container">
                  <Sidebar theme={theme} />
                </div>
                {this.renderTheStatus()}
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default Gaming
