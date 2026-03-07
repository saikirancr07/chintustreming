import {Component} from 'react'

import ReactPlayer from 'react-player'
import {Circles} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import SavedContext from '../../context/SavedContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import withRouter from '../withRouter'

import './index.css'

class VideoItemDetails extends Component {
  state = {
    status: '',
    videosList: [],
    isLiked: false,
    isDisliked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getTheVideos()
  }

  getTheVideos = async () => {
    const id=this.props.params.id
    console.log(id)
    this.setState({status: 'INPROGRESS'})

    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const videos = data.video_details
      const updatedData = {
        channel: {
          name: videos.channel.name,
          profileImageUrl: videos.channel.profile_image_url,
          subscriberCount: videos.channel.subscriber_count,
        },
        description: videos.description,
        id: videos.id,
        publishedAt: videos.published_at,
        thumbnailUrl: videos.thumbnail_url,
        title: videos.title,
        videoUrl: videos.video_url,
        viewCount: videos.view_count,
      }
      this.setState({videosList: updatedData, status: 'SUCCESS'})
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

  clickTheLikeButton = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  clickTheDislikeButton = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  renderTheSuccessView = () => (
    <SavedContext.Consumer>
      {value => {
        const {addSavedVideos} = value
        const {videosList, isLiked, isDisliked, isSaved} = this.state

        const {
          videoUrl,
          title,
          publishedAt,
          channel,
          viewCount,
          description,
        } = videosList
        const likedContainer = isLiked
          ? 'active-liked-container'
          : 'inActive-liked-container'
        const dislikedContainer = isDisliked
          ? 'active-disliked-container'
          : 'inActive-disliked-container'
        const savedContainer = isSaved
          ? 'active-saved-container'
          : 'inActive-saved-container'

        const clickTheSaveButton = () => {
          this.setState(prevState => ({isSaved: !prevState.isSaved}))
          addSavedVideos(videosList)
        }

        const save = isSaved ? "unSaved" : "Save"
    
        return (
          <div className="video-container">
            <ReactPlayer src={videoUrl} width="100%" height="50%"/>
            <p>{title}</p>
            <div className="view-year-likes-container">
              <div className="views-year">
                <p>{viewCount} . </p>
                <p> {this.renderTheYear(publishedAt)}</p>
              </div>
              <div className="likes-dislikes-container">
                <div>
                  <button type="button" className={likedContainer} onClick={this.clickTheLikeButton}>
                    <BiLike
                      size="20"
                      className="videos-icon"
                    />
                    Like
                  </button>
                </div>
                <div>
                  <button type="button" className={dislikedContainer} onClick={this.clickTheDislikeButton}>
                    <BiDislike
                      size="20"
                      className="videos-icon"
                    />
                    Dislike
                  </button>
                </div>
                <div>
                  <button type="button" className={savedContainer} onClick={clickTheSaveButton}>
                    <MdPlaylistAdd
                      size="20"
                      className="videos-icon"
                    />
                    {save}
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="videos-content">
              <img
                src={channel.profileImageUrl}
                alt="channel logo"
                className="profile-image"
              />
              <div className="videos-right">
                <p>{channel.name}</p>
                <p>{description}</p>
                <p>{channel.subscriberCount} subscribers</p>
              </div>
            </div>
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
            <div className={homeBgContainer} data-testid="videoItemDetails">
              <Header />
              <div className="videos-bottom-container">
                <div className="videos-sidebar-container">
                  <Sidebar theme={theme}/>
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

const VideiItemDetailsWithRouter = withRouter(VideoItemDetails)

export default VideiItemDetailsWithRouter
