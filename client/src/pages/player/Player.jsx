import React, { useCallback } from "react";
import backDrStone from "../../assets/images/1027254.jpg";
import affiche from "../../assets/images/981906.jpg";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import Video from "../../assets/videos/episode.mp4";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loader from "../../components/loader/loader";
import Navbar from "../../components/navbar/Navbar";

import "./Player.scss";

var json = require("../../utils/fr.json");

function Player() {
  const [videoWorks, setVideoWorks] = useState(false);
  const [volumeValue, setVolumeValue] = useState(1);
  const [isLoaded, setIsLoaded] = useState(true);

  const closeMenu = () => {
    const menu = document.querySelector(".menu");
    menu.classList.remove("open");
    menu.classList.add("close");
  };

  const openMenu = () => {
    const menu = document.querySelector(".menu");
    menu.classList.add("open");
    menu.classList.remove("close");
  };

  function previousVideo() {
    const progressBar = document.getElementById("progress-bar");
    const seek = document.getElementById("seek");
    const video = document.getElementById("video");
    var currentTime = Math.round(video.currentTime);

    video.currentTime = currentTime - 5;
    progressBar.value = currentTime - 5;
    seek.value = currentTime - 5;
  }

  function nextVideo() {
    const progressBar = document.getElementById("progress-bar");
    const seek = document.getElementById("seek");
    const video = document.getElementById("video");
    var currentTime = Math.round(video.currentTime);

    video.currentTime = currentTime + 5;
    progressBar.value = currentTime + 5;
    seek.value = currentTime + 5;
  }

  function updatePlayButton() {
    const playbackIcons = document.querySelectorAll(".playback-icons use");
    const playButton = document.getElementById("play");

    const video = document.getElementById("video");
    playbackIcons.forEach((icon) => icon.classList.toggle("hidden"));

    if (video.paused) {
      playButton.setAttribute("data-title", "Play (k)");
    } else {
      playButton.setAttribute("data-title", "Pause (k)");
    }
  }

  function formatTime(timeInSeconds) {
    if (!timeInSeconds) return;
    const result = new Date(timeInSeconds * 1000)
      .toISOString()
      .substring(11, 19);

    return {
      minutes: result.substring(3, 5),
      seconds: result.substring(6, 8),
    };
  }

  function initializeVideo() {
    const duration = document.getElementById("duration");
    const video = document.getElementById("video");
    const progressBar = document.getElementById("progress-bar");
    const seek = document.getElementById("seek");

    const videoDuration = Math.round(video.duration);
    seek.setAttribute("max", videoDuration);
    progressBar.setAttribute("max", videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);

    if (videoWorks) {
      const videoControls = document.getElementById("video-controls");
      const video = document.getElementById("video");
      video.controls = false;
      videoControls.classList.remove("hidden");
    }
  }

  function updateTimeElapsed() {
    const timeElapsed = document.getElementById("time-elapsed");
    const video = document.getElementById("video");

    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time?.minutes || "00"}:${time?.seconds || "00"}`;
    timeElapsed.setAttribute(
      "datetime",
      `${time?.minutes || "00"}m ${time?.seconds || "00"}s`
    );
  }

  function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    const seek = document.getElementById("seek");

    const video = document.getElementById("video");

    var currentTime = Math.round(video.currentTime);

    seek.value = currentTime;
    progressBar.value = currentTime;

    updateTimeElapsed();
  }

  function updateSeekTooltip(event) {
    const seekTooltip = document.getElementById("seek-tooltip");
    const seek = document.getElementById("seek");

    const video = document.getElementById("video");

    const skipTo = Math.round(
      (event.clientX / event.target.clientWidth) *
        parseInt(event.target.getAttribute("max"), 10)
    );
    seek.setAttribute("data-seek", skipTo);
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t?.minutes || "0"}:${t?.seconds || "00"}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
  }

  function skipAhead(event) {
    const progressBar = document.getElementById("progress-bar");
    const seek = document.getElementById("seek");

    const video = document.getElementById("video");

    const skipTo = event.target.value;

    if (isFinite(skipTo)) {
      video.currentTime = skipTo;
      progressBar.value = skipTo;
      seek.value = skipTo;
    }
  }

  const togglePlay = useCallback(() => {
    const video = document.getElementById("video");
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
    animatePlayback();
  }, []);

  const updateVolumeIcon = useCallback(() => {
    const volumeLow = document.querySelector('use[href="#volume-low"]');
    const volumeHigh = document.querySelector('use[href="#volume-high"]');
    const volumeMute = document.querySelector('use[href="#volume-mute"]');
    const volumeIcons = document.querySelectorAll(".volume-button use");
    const volumeButton = document.getElementById("volume-button");
    const video = document.getElementById("video");

    volumeIcons.forEach((icon) => {
      icon.classList.add("hidden");
    });

    volumeButton.setAttribute("data-title", "Mute (m)");

    if (video.muted || video.volume === 0) {
      volumeMute.classList.remove("hidden");
      volumeButton.setAttribute("data-title", "Unmute (m)");
    } else if (video.volume > 0 && video.volume <= 0.5) {
      volumeLow.classList.remove("hidden");
    } else {
      volumeHigh.classList.remove("hidden");
    }
  }, []);

  const increaseVol = useCallback(() => {
    const video = document.getElementById("video");

    if (video.muted) {
      video.muted = false;
    }
    if (video.volume < 1) {
      video.volume += 0.1;
    }
    updateVolumeIcon();
    setVolumeValue(video.volume);
  }, [updateVolumeIcon, setVolumeValue]);

  const decreaseVol = useCallback(() => {
    const video = document.getElementById("video");

    if (video.muted) {
      video.muted = false;
    }
    if (video.volume > 0.1) {
      video.volume -= 0.1;
    } else {
      video.muted = true;
      updateVolumeIcon();
    }
    setVolumeValue(video.volume);
  }, [updateVolumeIcon, setVolumeValue]);

  function toggleMute() {
    const video = document.getElementById("video");
    const volume = document.getElementById("volume");

    video.muted = !video.muted;

    if (video.muted) {
      volume.setAttribute("data-volume", volume.value);
      volume.value = 0;
    } else {
      volume.value = volume.dataset.volume;
    }
  }
    
    function updateVolume(event) {
        const video = document.getElementById("video");
        const volume = document.getElementById("volume");

        video.volume = event.target.value;
        setVolumeValue(event.target.value);
        updateVolumeIcon();
    }

  function animatePlayback() {
    const playbackAnimation = document.getElementById("playback-animation");
    playbackAnimation.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)",
        },
        {
          opacity: 0,
          transform: "scale(1.3)",
        },
      ],
      {
        duration: 500,
      }
    );
    playbackAnimation.style.opacity = 0;
  }

  function toggleFullScreen() {
    const videoContainer = document.getElementById("video-container");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      document.webkitExitFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      // Need this to support Safari
      videoContainer.webkitRequestFullscreen();
    } else {
      videoContainer.requestFullscreen();
    }
  }

  function updateFullscreenButton() {
    const fullscreenButton = document.getElementById("fullscreen-button");
    const fullscreenIcons = fullscreenButton.querySelectorAll("use");

    fullscreenIcons.forEach((icon) => icon.classList.toggle("hidden"));

    if (document.fullscreenElement) {
      fullscreenButton.setAttribute("data-title", "Exit full screen (f)");
    } else {
      fullscreenButton.setAttribute("data-title", "Full screen (f)");
    }
  }

  async function togglePip() {
    const pipButton = document.getElementById("pip-button");
    const video = document.getElementById("video");
    try {
      if (video !== document.pictureInPictureElement) {
        pipButton.disabled = true;
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error(error);
    } finally {
      pipButton.disabled = false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const pipButton = document.getElementById("pip-button");
    if (!("pictureInPictureEnabled" in document)) {
      pipButton.classList.add("hidden");
    }
  });

  function hideControls() {
    const video = document.getElementById("video");
    const videoControls = document.getElementById("video-controls");

    if (video.paused) {
      return;
    }

    videoControls.classList.add("hide");
  }

  function showControls() {
    const videoControls = document.getElementById("video-controls");

    videoControls.classList.remove("hide");
  }

  useEffect(() => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (
          ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
            e.code
          ) > -1
        ) {
          e.preventDefault();
        }
      },
      false
    );
    const videoTest = document.createElement("video");
    document.addEventListener("keyup", keyboardShortcuts);
    setVideoWorks(!!videoTest.canPlayType);
    document
      .getElementById("video-container")
      .addEventListener("fullscreenchange", updateFullscreenButton);
    function keyboardShortcuts(event) {
      const video = document.getElementById("video");

      const { key } = event;
      switch (key) {
        case " " || "Space" || 32:
          togglePlay();
          animatePlayback();
          if (video.paused) {
            showControls();
          } else {
            setTimeout(() => {
              hideControls();
            }, 2000);
          }
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullScreen();
          break;
        case "p":
          togglePip();
          break;
        // vol up
        case "ArrowUp":
          increaseVol();
          break;
        // vol down
        case "ArrowDown":
          decreaseVol();
          break;
        // previous 10sec
        case "ArrowLeft":
          previousVideo();
          break;
        // skip 10sec
        case "ArrowRight":
          nextVideo();
          break;
        default:
          break;
      }
    }
    return () => {
      document.removeEventListener("keyup", keyboardShortcuts);
    };
  }, [decreaseVol, increaseVol, togglePlay]);

  return (
    <>
      <img src={backDrStone} alt="" className="background" />
      {/*      <Navbar />
       */}{" "}
      <div className="menu-content">
        <div className="menu close">
          <div className="close-cross">
            <CloseIcon className="close-icon" onClick={closeMenu} />
          </div>
          <div className="short-menu">
            <LogoutIcon className="open-icon" onClick={openMenu} />
            <ul>
              <li className="season-short-menu">S1</li>
              <li className="ep-short-menu ep-active">EP.1</li>
              <li className="ep-short-menu">EP.2</li>
              <li className="ep-short-menu">EP.3</li>
              <li className="ep-short-menu">EP.4</li>
              <li className="ep-short-menu">EP.5</li>
              <li className="ep-short-menu">EP.6</li>
              <li className="ep-short-menu">EP.7</li>
              <li className="ep-short-menu">EP.8</li>
              <li className="ep-short-menu">EP.9</li>
              <li className="ep-short-menu">EP.10</li>
              <li className="ep-short-menu">EP.11</li>
              <li className="ep-short-menu">EP.12</li>
              <li className="ep-short-menu">EP.13</li>
              <li className="ep-short-menu">EP.14</li>
              <li className="ep-short-menu">EP.15</li>
              <li className="ep-short-menu">EP.16</li>
              <li className="ep-short-menu">EP.17</li>
              <li className="ep-short-menu">EP.18</li>
              <li className="season-short-menu">S2</li>
              <li className="ep-short-menu">EP.19</li>
              <li className="ep-short-menu">EP.20</li>
              <li className="ep-short-menu">EP.21</li>
              <li className="ep-short-menu">EP.22</li>
              <li className="ep-short-menu">EP.23</li>
              <li className="ep-short-menu">EP.24</li>
              <li className="ep-short-menu">EP.25</li>
              <li className="ep-short-menu">EP.26</li>
              <li className="ep-short-menu">EP.27</li>
              <li className="ep-short-menu">EP.28</li>
              <li className="ep-short-menu">EP.29</li>
              <li className="ep-short-menu">EP.30</li>
              <li className="ep-short-menu">EP.31</li>
              <li className="ep-short-menu">EP.32</li>
              <li className="ep-short-menu">EP.33</li>
              <li className="ep-short-menu">EP.34</li>
              <li className="ep-short-menu">EP.35</li>
              <li className="ep-short-menu">EP.36</li>
            </ul>
          </div>

          <div className="header-menu">
            <img
              src={backDrStone}
              alt="background anime"
              className="back-img"
            />
            <div className="header-back-layout">
              <div className="anime-infos">
                <img src={affiche} alt="poster" />
                <div className="anime-infos-text">
                  <span>ANIME TITLE</span>
                  <p>
                    Nullam facilisis sagittis mauris, nec faucibus felis maximus
                    eu. Vestibulum interdum nulla non volutpat accumsan...
                    <Link to="/summary">{json.play.SeeMore}</Link>
                  </p>
                </div>
              </div>
              <div className="others-informations">
                <div className="tags">
                  <span className="genre-tag">
                    {" "}
                    <LocalOfferIcon />
                    Genres: Comédie,Action..
                  </span>
                  <span className="date-tag">
                    <CalendarMonthIcon /> Date: 29/02/2019
                  </span>
                </div>
                <span className="lang-tag">VOSTFR</span>
              </div>
            </div>
          </div>
          <div className="body-menu">
            <div className="season-content">
              <p className="season-number">SAISON 1</p>
              <ul>
                <li className="ep-active-menu">EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
                <li>EPISODE 1: “Stone World”</li>
                <li>EPISODE 2: “King of the Stone World”</li>
                <li>EPISODE 3: “Weapons of the Science”</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="player-content">
        <div className="container-watch">
          <h1 className="anime-episode-title">
            DR.STONE EPISODE 27 SAISON 1 VOSTFR
          </h1>
          <div className="player-buttons">
            <div className="player-button">
              <p>{json.play.Player}</p>
              <select className="top-video-button">
                <option>Lecteur 1</option>
                <option>Lecteur 2</option>
              </select>
            </div>
            <button className="top-video-button">
              <ArrowBackIosIcon className="arrow-icons" />
              {json.play.Previous}
            </button>
            <button className="top-video-button">
              {json.play.Next}
              <ArrowForwardIosIcon className="arrow-icons" />
            </button>
          </div>
          <div className="video-container" id="video-container">
            <div className="playback-animation" id="playback-animation">
              <svg className="playback-icons">
                <use href="#play-icon"></use>
                <use className="hidden" href="#pause"></use>
              </svg>
            </div>
            {isLoaded ? (
              <video
                controls
                className="video"
                id="video"
                preload="metadata"
                poster={affiche}
                onPlay={updatePlayButton}
                onPause={updatePlayButton}
                onLoadedMetadata={() => {
                  setIsLoaded(true);
                  initializeVideo();
                }}
                onTimeUpdate={updateProgress}
                onVolumeChange={updateVolumeIcon}
                onClick={togglePlay}
                onMouseEnter={showControls}
                onMouseLeave={hideControls}
              >
                <source src={Video} type="video/mp4"></source>
              </video>
            ) : (
              <div className="loader-container">
                <div className="loader">
                  <Loader size={400} color="#a3a3a3" />
                </div>
              </div>
            )}
            ;
            <div
              className="video-controls hidden"
              id="video-controls"
              onMouseEnter={showControls}
              onMouseLeave={hideControls}
            >
              <div className="video-progress">
                <progress id="progress-bar" value={0} min={0}></progress>
                <input
                  className="seek"
                  id="seek"
                  value={0}
                  min={0}
                  type="range"
                  step={1}
                  onMouseMove={updateSeekTooltip}
                  onInput={skipAhead}
                ></input>
                <div className="seek-tooltip" id="seek-tooltip">
                  00:00
                </div>
              </div>

              <div className="bottom-controls">
                <div className="left-controls">
                  <button
                    className="lectorbutton"
                    data-title="Play"
                    id="play"
                    onClick={togglePlay}
                  >
                    <svg className="playback-icons lectorsvg">
                      <use href="#play-icon"></use>
                      <use className="hidden" href="#pause"></use>
                    </svg>
                  </button>

                  <div className="volume-controls">
                    <button
                      data-title="Mute (m)"
                      className="volume-button lectorbutton"
                      id="volume-button"
                      onClick={toggleMute}
                    >
                      <svg className="lectorsvg">
                        <use className="hidden" href="#volume-mute"></use>
                        <use className="hidden" href="#volume-low"></use>
                        <use href="#volume-high"></use>
                      </svg>
                    </button>

                    <input
                      className="volume"
                      id="volume"
                      onInput={updateVolume}
                      value={volumeValue}
                      data-mute={0.5}
                      type="range"
                      max={1}
                      min={0}
                      step={0.01}
                    ></input>
                  </div>

                  <div className="time">
                    <time id="time-elapsed">00:00</time>
                    <span> / </span>
                    <time id="duration">00:00</time>
                  </div>
                </div>

                <div className="right-controls">
                  <button
                    data-title="Loop (l)"
                    className="loop-button lectorbutton"
                    id="loop-button"
                  ></button>
                  <button
                    data-title="PIP (p)"
                    className="pip-button lectorbutton"
                    id="pip-button"
                    onClick={togglePip}
                  >
                    <svg>
                      <use href="#pip"></use>
                    </svg>
                  </button>
                  <button
                    data-title="Full screen (f)"
                    className="fullscreen-button lectorbutton"
                    id="fullscreen-button"
                    onClick={toggleFullScreen}
                  >
                    <svg>
                      <use href="#fullscreen"></use>
                      <use href="#fullscreen-exit" className="hidden"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-buttons">
            <button className="reported-button">
              {json.play["Reported-button"]}
            </button>
          </div>
        </div>

        <svg style={{ display: "none" }}>
          <defs>
            <symbol id="pause" viewBox="0 0 24 24">
              <path d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"></path>
            </symbol>

            <symbol id="play-icon" viewBox="0 0 24 24">
              <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z"></path>
            </symbol>

            <symbol id="volume-high" viewBox="0 0 24 24">
              <path d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q1.031 0.516 1.758 1.688t0.727 2.344zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path>
            </symbol>

            <symbol id="volume-low" viewBox="0 0 24 24">
              <path d="M5.016 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6zM18.516 12q0 2.766-2.531 4.031v-8.063q1.031 0.516 1.781 1.711t0.75 2.32z"></path>
            </symbol>

            <symbol id="volume-mute" viewBox="0 0 24 24">
              <path d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.547 1.313-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.203-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q1.031 0.516 1.758 1.688t0.727 2.344z"></path>
            </symbol>

            <symbol id="fullscreen" viewBox="0 0 24 24">
              <path d="M14.016 5.016h4.969v4.969h-1.969v-3h-3v-1.969zM17.016 17.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 9.984v-4.969h4.969v1.969h-3v3h-1.969zM6.984 14.016v3h3v1.969h-4.969v-4.969h1.969z"></path>
            </symbol>

            <symbol id="fullscreen-exit" viewBox="0 0 24 24">
              <path d="M15.984 8.016h3v1.969h-4.969v-4.969h1.969v3zM14.016 18.984v-4.969h4.969v1.969h-3v3h-1.969zM8.016 8.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 15.984v-1.969h4.969v4.969h-1.969v-3h-3z"></path>
            </symbol>

            <symbol id="pip" viewBox="0 0 24 24">
              <path d="M21 19.031v-14.063h-18v14.063h18zM23.016 18.984q0 0.797-0.609 1.406t-1.406 0.609h-18q-0.797 0-1.406-0.609t-0.609-1.406v-14.016q0-0.797 0.609-1.383t1.406-0.586h18q0.797 0 1.406 0.586t0.609 1.383v14.016zM18.984 11.016v6h-7.969v-6h7.969z"></path>
            </symbol>
          </defs>
        </svg>
      </div>
    </>
  );
}

export default Player;
