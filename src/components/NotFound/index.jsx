import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <Header />
    <div className="not-found-bottom-container">
      <div className="trending-sidebar-container">
        <Sidebar />
      </div>
      <div className="not-found-content">
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
            className="not-found-image"
          />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound
