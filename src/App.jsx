import {Component} from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'

import SavedContext from './context/SavedContext.jsx'

import Login from './components/Login'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'


class App extends Component {
  state = {savedVideosList: [], theme: true,active : "home"}

  addSavedVideos = product => {
    const {savedVideosList} = this.state
    const updatedData = [...savedVideosList, product]
    this.setState({
      savedVideosList: updatedData,
    })
  }

  clickTheTheme = () => {
    this.setState(prevState => ({theme: !prevState.theme}))
  }

  changeActive=(value)=>(
    this.setState({active : value})
  )

  render() {
    const {savedVideosList, theme,active} = this.state
    return (
      <Router>
      <SavedContext.Provider
        value={{
          theme,
          savedVideosList,
          active,
          addSavedVideos: this.addSavedVideos,
          clickTheTheme: this.clickTheTheme,
          changeActive : this.changeActive,
        }}
      >
        <Routes>
          <Route path="/Login" element={<Login/>} />
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/videos/:id" element={<ProtectedRoute><VideoItemDetails/></ProtectedRoute>}/>
          <Route path="/trending" element={<ProtectedRoute><Trending/></ProtectedRoute>}/>
          <Route path="/gaming" element={<ProtectedRoute><Gaming/></ProtectedRoute>}/>
          <Route path="/saved-videos" element={<ProtectedRoute><SavedVideos/></ProtectedRoute>}/>
          <Route path="*" element={<ProtectedRoute><NotFound/></ProtectedRoute>} />
        </Routes>
      </SavedContext.Provider>
      </Router>
    )
  }
}


export default App




