import React from 'react'

const SavedContext = React.createContext({
  theme: true,
  active : "home",
  savedVideosList: [],
  changeActive : () => {},
  addSavedVideos: () => {},
  changeTheTheme: () => {},
})

export default SavedContext