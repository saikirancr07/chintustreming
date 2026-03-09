import {Component} from 'react'

import {Link} from 'react-router-dom'
import {Circles} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedContext from '../../context/SavedContext'


import './index.css'

class Home extends Component {
  state = {
    status: '',
    searchInput: '',
    videosList: [],
    isShow: true,
  }

  componentDidMount() {
    this.getTheProducts()
  }

  getTheProducts = async () => {
    this.setState({status: 'INPROGRESS'})

    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    console.log(token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
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

  renderTheYear = year => formatDistanceToNow(new Date(year))

  clickTheRetryButton = () => {
    this.getTheProducts()
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

  renderTheNoVideosView = () => (
    <div className="failure-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="failure-image"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.clickTheRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderTheSuccessView = (theme) => {
    const {videosList} = this.state
    const homeListItem = theme ? 'light-home-link-item' : 'dark-home-link-item'

    if (videosList.length === 0) {
      return this.renderTheNoVideosView()
    }

    return (
      <ul className="home-list-container">
        {videosList.map(eachItem => (
          <li key={eachItem.id} className="home-list-item">
            <Link to={`/videos/${eachItem.id}`} className={homeListItem}>
              <img
                src={eachItem.thumbnailUrl}
                alt="video thumbnail"
                className="home-image"
              />
              <div className="item-container">
                <img
                  src={eachItem.channel.profileImageUrl}
                  alt="channel logo"
                  className="profile-image"
                />
                <div className="home-content">
                  <p className="title">{eachItem.title}</p>
                  <p className="name">{eachItem.channel.name}</p>
                  <div className="count-year">
                    <p>{eachItem.viewCount} Views . </p>
                    <p> {this.renderTheYear(eachItem.publishedAt)}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderTheStatus = (theme) => {
    const {status} = this.state
    switch (status) {
      case 'INPROGRESS':
        return this.renderTheLoading(theme)
      case 'SUCCESS':
        return this.renderTheSuccessView(theme)
      case 'FAILURE':
        return this.renderTheFailure(theme)
      default:
        return null
    }
  }

  changeTheSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  changeTheSearchValue = () => {
    this.getTheProducts()
  }

  clickTheTheCloseButton = () => {
    this.setState({isShow: false})
  }

  render() {
    return (
      <SavedContext.Consumer>
        {value => {
          const {theme} = value
          const homeBgContainer = theme
            ? 'light-home-bg-container'
            : 'dark-home-bg-container'
          const {searchInput, isShow} = this.state
          return (
            <div className={homeBgContainer} data-testid="banner">
              <Header clickTheTheme={this.clickTheTheme} />
              <div className="home-bottom-container">
                <div>
                  <Sidebar theme={theme} />
                </div>
                <div className="home-right-container">
                  {isShow && (
                    <div className="top-section">
                      <div>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          className="website-logo-home"
                          alt="nxt watch logo"
                        />
                        <p className="top-section-para">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button type="button" className="get-it-now">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        type="button"
                        className="close-button"
                        data-testid="close"
                        onClick={this.clickTheTheCloseButton}
                      >
                        <AiOutlineClose size="20" />
                      </button>
                    </div>
                  )}
                  <div className="search-container">
                    <input
                      type="search"
                      className="search"
                      value={searchInput}
                      placeholder="Search"
                      onChange={this.changeTheSearchInput}
                    />
                    <button
                      type="button"
                      className="search-button"
                      data-testid="searchButton"
                      onClick={this.changeTheSearchValue}
                    >
                      <AiOutlineSearch size="20" />
                    </button>
                  </div>
                  <div className="bottom-section">{this.renderTheStatus(theme)}</div>
                </div>
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default Home
