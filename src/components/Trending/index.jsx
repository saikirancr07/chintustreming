import {Component} from 'react'

import {Link} from 'react-router-dom'
import {Circles} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {FaHotjar} from 'react-icons/fa'
import SavedContext from '../../context/SavedContext'

import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

class Trending extends Component {
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
    const apiUrl = `https://apis.ccbp.in/videos/trending`
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
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
      }))
      this.setState({status: 'SUCCESS', videosList})
    } else {
      this.setState({status: 'FAILURE'})
    }
  }

  renderTheLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Circles/>
    </div>
  )

  renderTheYear = year => {
    return formatDistanceToNow(new Date(year))
  }

  renderTheSuccessView = () => (
    <SavedContext.Consumer>
      {value => {
        const {theme} = value
        const homeBgContainer = theme
          ? 'light-home-bg-container'
          : 'dark-home-bg-container'
        const themeColor = theme ? 'white-theme' : 'black-theme'
        const linkTextColor = theme ? "white-link" : "black-link"

        const {videosList} = this.state
        return (
          <div className={homeBgContainer}>
            <div className={`trending-icon-container ${themeColor}`}>
              <button type="button" className="trending-icon-button">
                <FaHotjar size="30" className="trending-icon" />
              </button>
              <h1 className="sidebar-para">Trending</h1>
            </div>
            <ul className="trending-list-container">
              {videosList.map(eachItem => (
                <li key={eachItem.id} className="trending-list-item">
                  <Link
                    to={`/videos/${eachItem.id}`}
                    className={linkTextColor}
                  >
                    <img
                      src={eachItem.thumbnailUrl}
                      alt="video thumbnail"
                      className="trending-thumbnail-url"
                    />
                    <div className="trending-content">
                      <p className="trending-title">{eachItem.title}</p>
                      <p>{eachItem.channel.name}</p>
                      <div className="year-views">
                        <p>{eachItem.viewCount} Views</p>
                        <p> {this.renderTheYear(eachItem.publishedAt)}</p>
                      </div>
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
            <div className={homeBgContainer} data-testid="trending">
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

export default Trending
