import {Component} from 'react'

import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'
import SavedContext from '../../context/SavedContext'

class SavedVideos extends Component {
  renderTheYear = year => formatDistanceToNow(new Date(year))

  renderFailureView = () => (
    <div className="failure-content">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-image"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  render() {
    return (
      <SavedContext.Consumer>
        {value => {
          const {savedVideosList, theme} = value
          const isShow = savedVideosList.length > 0
          const homeBgContainer = theme
            ? 'light-saved-videos-bg-container'
            : 'dark-saved-videos-bg-container'
          const savedVideosLinkItem = theme ? 'light-saved-videos-link-item' : 'dark-saved-videos-link-item'
          const savedVideosSuccessContainer = theme ? 'light-saved-videos-success-container' : 'dark-saved-videos-success-container'
          return (
            <div className={homeBgContainer} data-testid="savedVideos">
              <Header />
              <div className="trending-bottom-container">
                <div className="trending-sidebar-container">
                  <Sidebar theme={theme} />
                </div>
                {isShow ? (
                  <div className={savedVideosSuccessContainer}>
                    <div className="trending-icon-container">
                      <button type="button" className="trending-icon-button">
                        <MdPlaylistAdd size="30" className="trending-icon" />
                      </button>
                      <h1 className="sidebar-para">Saved Videos</h1>
                    </div>
                    <ul className="saved-list-container">
                      {savedVideosList.map(eachItem => (
                        <Link
                            to={`/videos/${eachItem.id}`}
                            className={savedVideosLinkItem}
                          >
                          <li key={eachItem.id} className="saved-videos-list-item">
                              <img
                                src={eachItem.thumbnailUrl}
                                alt="video thumbnail"
                                className="saved-videos-image-url"
                              />
                              <div className="saved-videos-content">
                                <p className="trending-title">{eachItem.title}</p>
                                <p className="name">{eachItem.channel.name}</p>
                                <div className="count-year">
                                  <p>{eachItem.viewCount} . </p>
                                  <p>
                                    {this.renderTheYear(eachItem.publishedAt)}
                                  </p>
                                </div>
                              </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                ) : (
                  this.renderFailureView()
                )}
              </div>
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }
}

export default SavedVideos
