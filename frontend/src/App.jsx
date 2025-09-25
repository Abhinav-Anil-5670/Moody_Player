import './App.css'
import FaceDetection from './components/FaceDetection'
import MoodSongs from './components/MoodSongs'
import { useState } from 'react'


function App() {
  const [Songs, setSongs] = useState([
        
    ])
  

  return (
    <>
      <FaceDetection setSongs={setSongs}/>
      <MoodSongs Songs = {Songs}/>
    </>
  )
}

export default App
