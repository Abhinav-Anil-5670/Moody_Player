import React, { useState, useRef } from 'react'
import './MoodSongs.css'

const MoodSongs = ({ Songs = [] }) => {
  const [isPlaying, setIsPlaying] = useState(null)
  const audioRefs = useRef([])

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index]

    if (!currentAudio) return

    if (isPlaying === index) {
      // pause current song
      currentAudio.pause()
      setIsPlaying(null)
    } else {
      // pause any previously playing song
      if (isPlaying !== null && audioRefs.current[isPlaying]) {
        audioRefs.current[isPlaying].pause()
        audioRefs.current[isPlaying].currentTime = 0
      }
      // play new song
      currentAudio.play()
      setIsPlaying(index)
    }
  }

  return (
    <div className='mood-songs'>
      <h2>Song List</h2>
      {
        Songs.length > 0 ? (
          Songs.map((song, index) => (
            <div className='song' key={index}>
              <div className="title">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
              <div className="play-pause-button">
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                />
                <button onClick={() => handlePlayPause(index)}>
                  {isPlaying === index ? (
                    <i className="ri-pause-line"></i>
                  ) : (
                    <i className="ri-play-circle-fill"></i>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No songs found.</p>
        )
      }
    </div>
  )
}

export default MoodSongs
