'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [blinkLeft, setBlinkLeft] = useState(false)
  const [blinkRight, setBlinkRight] = useState(false)
  const [headTilt, setHeadTilt] = useState(0)
  const [handGesture, setHandGesture] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoLength = 30

  const script = [
    { time: 0, text: "Hey everyone! Welcome back to my channel." },
    { time: 3, text: "Today I want to share the Instagram growth secrets" },
    { time: 7, text: "that took me from 1K to 500K followers in just 6 months." },
    { time: 12, text: "First, consistency is KEY. Post at least once daily" },
    { time: 16, text: "when your audience is most active." },
    { time: 19, text: "Second, use Reels! The algorithm loves video content." },
    { time: 23, text: "And finally, engage with your community every single day." },
    { time: 27, text: "Try these tips and watch your growth explode!" }
  ]

  const getCurrentText = () => {
    for (let i = script.length - 1; i >= 0; i--) {
      if (currentTime >= script[i].time) {
        return script[i].text
      }
    }
    return ""
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= videoLength) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    const mouthInterval = setInterval(() => {
      if (isPlaying) {
        setMouthOpen(prev => !prev)
      }
    }, 200 + Math.random() * 100)

    return () => clearInterval(mouthInterval)
  }, [isPlaying])

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const shouldBlink = Math.random() > 0.95
      if (shouldBlink) {
        setBlinkLeft(true)
        setBlinkRight(true)
        setTimeout(() => {
          setBlinkLeft(false)
          setBlinkRight(false)
        }, 150)
      }
    }, 200)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    const headInterval = setInterval(() => {
      if (isPlaying) {
        setHeadTilt(Math.sin(currentTime * 0.5) * 3)
      }
    }, 100)

    return () => clearInterval(headInterval)
  }, [isPlaying, currentTime])

  useEffect(() => {
    const gestureInterval = setInterval(() => {
      if (isPlaying) {
        setHandGesture(Math.floor(Math.random() * 4))
      }
    }, 2000)

    return () => clearInterval(gestureInterval)
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying && currentTime >= videoLength) {
      setCurrentTime(0)
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.videoFrame}>
        <div className={styles.livingRoom}>
          {/* Background */}
          <div className={styles.wall}></div>
          <div className={styles.window}></div>
          <div className={styles.plant}></div>
          <div className={styles.bookshelf}></div>

          {/* Sofa */}
          <div className={styles.sofa}>
            <div className={styles.sofaBack}></div>
            <div className={styles.sofaSeat}></div>
            <div className={styles.sofaArmLeft}></div>
            <div className={styles.sofaArmRight}></div>
            <div className={styles.cushion1}></div>
            <div className={styles.cushion2}></div>
          </div>

          {/* Influencer */}
          <div
            className={styles.influencer}
            style={{ transform: `rotate(${headTilt}deg)` }}
          >
            {/* Body */}
            <div className={styles.body}></div>
            <div className={styles.neck}></div>

            {/* Head */}
            <div className={styles.head}>
              {/* Hair */}
              <div className={styles.hair}></div>
              <div className={styles.hairDetail1}></div>
              <div className={styles.hairDetail2}></div>

              {/* Face */}
              <div className={styles.face}>
                {/* Eyes */}
                <div className={styles.eyeLeft}>
                  <div className={styles.eyeball}>
                    <div className={styles.pupil}></div>
                  </div>
                  {blinkLeft && <div className={styles.eyelid}></div>}
                </div>
                <div className={styles.eyeRight}>
                  <div className={styles.eyeball}>
                    <div className={styles.pupil}></div>
                  </div>
                  {blinkRight && <div className={styles.eyelid}></div>}
                </div>

                {/* Eyebrows */}
                <div className={styles.eyebrowLeft}></div>
                <div className={styles.eyebrowRight}></div>

                {/* Nose */}
                <div className={styles.nose}></div>

                {/* Mouth */}
                <div className={`${styles.mouth} ${mouthOpen && isPlaying ? styles.mouthOpen : ''}`}>
                  {mouthOpen && isPlaying && <div className={styles.teeth}></div>}
                </div>

                {/* Cheeks */}
                <div className={styles.cheekLeft}></div>
                <div className={styles.cheekRight}></div>
              </div>
            </div>

            {/* Arms and hands */}
            <div className={styles.armLeft} style={{
              transform: handGesture === 1 ? 'rotate(-20deg)' : handGesture === 2 ? 'rotate(-40deg)' : 'rotate(-10deg)'
            }}>
              <div className={styles.handLeft}></div>
            </div>
            <div className={styles.armRight} style={{
              transform: handGesture === 1 ? 'rotate(30deg)' : handGesture === 3 ? 'rotate(50deg)' : 'rotate(20deg)'
            }}>
              <div className={styles.handRight}></div>
            </div>
          </div>

          {/* Lighting effects */}
          <div className={styles.lightOverlay}></div>
          {isPlaying && <div className={styles.ambientLight}></div>}
        </div>

        {/* Captions */}
        <div className={styles.captions}>
          <p>{getCurrentText()}</p>
        </div>

        {/* Video controls */}
        <div className={styles.controls}>
          <button className={styles.playButton} onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(currentTime / videoLength) * 100}%` }}
            ></div>
          </div>
          <span className={styles.time}>
            {formatTime(currentTime)} / {formatTime(videoLength)}
          </span>
        </div>
      </div>

      {/* Info panel */}
      <div className={styles.infoPanel}>
        <h1>Instagram Growth Secrets 🚀</h1>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>500K</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>6 Months</span>
            <span className={styles.statLabel}>Timeline</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>3 Tips</span>
            <span className={styles.statLabel}>Shared</span>
          </div>
        </div>
        <div className={styles.tips}>
          <h2>Key Takeaways:</h2>
          <ul>
            <li>📅 Post consistently every day</li>
            <li>🎬 Leverage Reels for algorithm boost</li>
            <li>💬 Engage with your community daily</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
