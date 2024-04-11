import React, { useCallback } from "react";
import { useParams } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useTheme } from "@mui/material";
import PreviewChat from "../../components/preview-chat/PreviewChat";
import Comment from "../../components/comment/Comment";
import { useUser } from "../../utils/useUser";
import { useNavigate } from "react-router-dom";
import { AnimeInfos, LeftArrow, RightArrow } from "../../utils/Icons";

import "./Player.scss";

var json = require("../../utils/fr.json");

function PlayerPage() {
  const [videoWorks, setVideoWorks] = useState(false);
  const [volumeValue, setVolumeValue] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [episode, setEpisode] = useState(null);
  const [anime, setAnime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [isMenuReportOpen, setIsMenuReportOpen] = useState(false);
  const [dataReport, setDataReport] = useState({});
  const { user } = useUser();
  const [error, setError] = useState("");
  const [episodeBySeason, setEpisodeBySeason] = useState([]);

  const { id } = useParams();
  const pageLink = window.location.href;
  const navigate = useNavigate();

  const ChangeEpisode = (episodeNumber) => {
    const episodeId = anime.episodes[episodeNumber - 1]?._id;
    if (episodeId) {
      navigate(`/watch/${episodeId}`);
    }
  };

  const updateDataReport = (e) => {
    setDataReport({
      user,
      ...dataReport,
      pageLink,
      [e.target.name]: `${e.target.value}`,
    });
  };

  const CustomReportValidation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/connection/reportEpisode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataReport),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(`L'email a été envoyé`);
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Une erreur s'est produite lors de l'envoi de l'e-mail.");
    }
    setIsMenuReportOpen(false);
  };

  const closeMenu = () => {
    const menu = document.querySelector(".menu");
    menu.classList.remove("open");
    menu.classList.add("close");
    setIsOpen(false);
  };

  const openMenu = () => {
    const menu = document.querySelector(".menu");
    menu.classList.add("open");
    menu.classList.remove("close");
    setIsOpen(true);
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
    if (!video) return;

    playbackIcons.forEach((icon) => icon.classList.toggle("hidden"));

    var isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;

    if (!isPlaying) {
      playButton.setAttribute("data-title", "Play (space)");
    } else {
      playButton.setAttribute("data-title", "Pause (space)");
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

  function initDuration() {
    const duration = document.getElementById("duration");
    const progressBar = document.getElementById("progress-bar");
    const seek = document.getElementById("seek");

    const time = formatTime(Math.round(video.duration));
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);

    const videoDuration = Math.round(video.duration);
    seek.setAttribute("max", videoDuration);
    progressBar.setAttribute("max", videoDuration);
  }

  const initializeVideo = (videoSource) => {
    const video = document.getElementById("video");

    video.source = videoSource;
    video.removeAttribute("poster");
    video.removeAttribute("controls");

    document
      .getElementById("video-container")
      .addEventListener("fullscreenchange", updateFullscreenButton);

    video.load();

    if (videoWorks) {
      const videoControls = document.getElementById("video-controls");
      const video = document.getElementById("video");
      video.controls = false;
      videoControls.classList.remove("hidden");
    }
  };

  function updateTimeElapsed() {
    const timeElapsed = document.getElementById("time-elapsed");
    const video = document.getElementById("video");

    if (!video) return;

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
    if (!video) return;

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

  const togglePlay = () => {
    const video = document.getElementById("video");
    if (!video) return;

    var isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;

    if (!isPlaying) {
      video.play();
      setVideoWorks(true);
    } else {
      video.pause();
      setVideoWorks(false);
    }
    updatePlayButton();
    animatePlayback();
  };

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
    if (!video) return;

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
    videoControls.classList.remove("hidden");
  }

  useEffect(() => {
    //? Temporary fix for the coming soon feature associate with the calendar
    if (window.location.href.includes("isComingSoon=true")) {
      setIsComingSoon(true);
    }

    window.addEventListener(
      "keydown",
      function (e) {
        if (
          ["input", "textarea"].indexOf(e.target.tagName.toLowerCase()) > -1
        ) {
          return;
        }
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

    document.addEventListener("keyup", keyboardShortcuts);

    function keyboardShortcuts(event) {
      const video = document.getElementById("video");
      if (!video) return;

      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      )
        return;

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

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/episodes/${id}`
        );
        setEpisode(response.data);
        fetchAnime(response.data.anime);
        addView(response.data.anime);
        const videoElement = document.getElementById("video");
        if (videoElement) {
          initializeVideo(response.data.source);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const addView = async (animeId) => {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_ADDRESS}/animes/views/${animeId}`
        );
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la mise à jour du nombre de vues :",
          error
        );
      }
    };

    const organiseEpisodesBySeason = (animes) => {
      const episodes = animes.episodes;
      const episodesBySeason = [];

      episodes.forEach((episode) => {
        const season = episode.season - 1;
        if (!episodesBySeason[season]) {
          episodesBySeason[season] = [];
        }
        episodesBySeason[season].push(episode);
      });

      setEpisodeBySeason(episodesBySeason);
    };

    const fetchAnime = async (animeId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/animes/${animeId}`
        );

        setAnime(response.data);
        organiseEpisodesBySeason(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisode();
    setIsLoading(false);
  }, [id]);

  const theme = useTheme().palette;

  if (isLoading || !anime || !episode) {
    return <Loader size={400} color="blue" />;
  }

  return (
    <>
      <div className="player-container">
        <img src={anime.thumbnail} alt="" className="background innershadow" />
        <Navbar color={anime.color} />
        <div className="menu-content">
          <div
            className="menu close"
            style={{
              backgroundColor: isOpen
                ? theme.background.default
                : theme.nav.primary,
            }}
          >
            <div className="close-cross">
              <CloseIcon className="close-icon" onClick={closeMenu} />
            </div>
            <div className="short-menu">
              <div className="short-menu-header">
                <LogoutIcon className="open-icon" onClick={openMenu} />
              </div>
              <ul>
                {episodeBySeason.map((season, index) => (
                  <li key={index}>
                    <span>S{index + 1}</span>
                    <ul>
                      {season.map((episode, index) => (
                        <li
                          key={index}
                          onClick={() => navigate(`/watch/${episode._id}`)}
                        >
                          <Link to={`/watch/${episode._id}`} key={index}>
                            EP. {episode.number}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="header-menu">
              <img
                src={anime.thumbnail}
                alt="background anime"
                className="back-img"
              />
              <div className="header-back-layout">
                <div className="anime-infos">
                  {/*                   <img src={anime.poster} alt="poster" />
                   */}{" "}
                  <div className="anime-infos-text">
                    <span>{anime.title}</span>
                    <p>
                      {anime.description.length > 300
                        ? anime.description.substring(0, 300) + "... "
                        : anime.description}
                      <Link to={`/summary/${anime._id}`}>
                        {json.play.SeeMore}
                      </Link>
                    </p>

                    <div className="others-informations">
                      <div className="tags">
                        <span className="genre-tag">
                          {anime?.categories
                            ?.slice(0, 4)
                            .map((category, index) => (
                              <span
                                key={index}
                                style={{
                                  backgroundColor: theme.tags.primary,
                                }}
                              >
                                {category}
                              </span>
                            ))}
                        </span>
                        <span className="date-tag">
                          <CalendarMonthIcon />{" "}
                          {new Date(anime.releaseDate).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="lang-tag">
                        {episode.lang.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-menu">
              <div className="season-content">
                {episodeBySeason.map((season, index) => (
                  <div key={index} className="season">
                    <p>Saison {index + 1}</p>
                    <ul>
                      {season.map((episode, index) => (
                        <li
                          key={index}
                          onClick={() => navigate(`/watch/${episode._id}`)}
                        >
                          <Link to={`/watch/${episode._id}`} key={index}>
                            {episode.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="player-content"
          style={{
            paddingRight: isComingSoon ? "0px" : "170px",
            display: isComingSoon ? "flex" : "block",
          }}
        >
          <div className="container-watch">
            <h1 className="anime-episode-title">
              {anime.title +
                " EPISODE " +
                " " +
                episode.number +
                " " +
                episode.lang}
            </h1>
            <div className="player-buttons">
              <div className="player-button">
                {!isComingSoon ? (
                  <select className="top-video-button">
                    <option>Lecteur 1</option>
                    <option>Lecteur 2</option>
                  </select>
                ) : null}
              </div>
              {episode.number > 1 ? (
                <button
                  className="top-video-button"
                  onClick={() => ChangeEpisode(episode.number - 1)}
                >
                  <LeftArrow className="arrow-icons" />
                  {json.play.Previous}
                </button>
              ) : null}
              <button
                className="top-video-button"
                style={{
                  backgroundColor: anime.color ? anime.color : "#000",
                }}
                onClick={() => navigate(`/summary/${anime._id}`)}
              >
                {json.play.Infos}
                <AnimeInfos />
              </button>
              {anime.episodes.length >= episode.number + 1 ? (
                <button
                  className="top-video-button"
                  onClick={() => ChangeEpisode(episode.number + 1)}
                >
                  {json.play.Next}
                  <RightArrow className="arrow-icons" />
                </button>
              ) : null}
            </div>

            <div
              className="video-container"
              id="video-container"
              style={{
                height: isComingSoon ? "600px" : "100%",
                backgroundImage: `url(${anime.poster})`,
                boxShadow: isComingSoon
                  ? "inset 0px 0px 1000px 1000px rgba(86, 86, 86, 0.48)"
                  : "none",
              }}
            >
              {!isComingSoon ? (
                <div className="playback-animation" id="playback-animation">
                  <svg className="playback-icons">
                    <use href="#play-icon"></use>
                    <use className="hidden" href="#pause"></use>
                  </svg>
                </div>
              ) : (
                <p className="coming-soon-player">{json.play.ComingSoon}</p>
              )}

              {!isLoading && !isComingSoon ? (
                <video
                  className="video"
                  id="video"
                  poster={anime.poster}
                  preload="metadata"
                  onTimeUpdate={updateProgress}
                  onVolumeChange={updateVolumeIcon}
                  onClick={togglePlay}
                  onMouseEnter={showControls}
                  onMouseLeave={hideControls}
                  onLoadedMetadata={initDuration}
                >
                  <source src={episode.source} type="video/mp4"></source>
                </video>
              ) : null}

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
            {!isComingSoon ? (
              <div className="bottom-buttons">
                <button className="reported-button">
                  {json.play["Reported-button"]}
                </button>
              </div>
            ) : null}
          </div>

          {!isComingSoon ? (
            <div className="player-comment">
              <Comment animeColor={anime.color} episodeID={episode._id} />
            </div>
          ) : (
            <PreviewChat episode={episode} />
          )}

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
      </div>
    </>
  );
}

export default PlayerPage;
