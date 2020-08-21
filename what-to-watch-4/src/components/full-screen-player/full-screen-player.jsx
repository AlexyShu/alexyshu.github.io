import React from "react";
import PropTypes from "prop-types";
import {getCurentFilm} from "../../utils.js";

const FullScreenPlayer = (props) => {
  const {
    films,
    videoRef,
    isPlaying,
    getToggleProgress,
    getTimeDuration,
    onLoadedMetadata,
    onTimeUpdate,
    onFullscreenButtonClick,
    onPlayButtonClick,
    onExitButtonClick,
  } = props;
  const film = getCurentFilm(films, props);
  return (film ?
    <div className="player">
      <video
        ref={videoRef}
        width="100%"
        className="player__video"
        poster={film.bigPosterUrl}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      >
        <source src={film.videoUrl} />
      </video>
      <button
        onClick={() => {
          onExitButtonClick();
          props.history.goBack();
        }}
        type="button"
        className="player__exit"
      >
        Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={getToggleProgress()}
              max="100"
            />
            <div
              className="player__toggler"
              style={{left: `${getToggleProgress()}%`}}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{getTimeDuration()}</div>
        </div>
        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayButtonClick}
          >
            {!isPlaying && (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </>
            )}
            {isPlaying && (
            <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
            <span>Pause</span>
              </>
            )}
          </button>
          <div className="player__name">Transpotting</div>
          <button
            onClick={onFullscreenButtonClick}
            type="button"
            className="player__full-screen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
    : null
  );
};

FullScreenPlayer.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        posterUrl: PropTypes.string,
        previewUrl: PropTypes.string,
        bigPosterUrl: PropTypes.string,
        backgroundColor: PropTypes.string,
        description: PropTypes.string,
        rating: PropTypes.number,
        votes: PropTypes.number,
        director: PropTypes.string,
        starring: PropTypes.arrayOf(PropTypes.string),
        runTime: PropTypes.string,
        genre: PropTypes.string,
        releaseYear: PropTypes.number,
        id: PropTypes.number,
        isFavorite: PropTypes.bool,
        videoUrl: PropTypes.string,
        trailerUrl: PropTypes.string
      })
  ).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  getToggleProgress: PropTypes.func.isRequired,
  getTimeDuration: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ]),
  history: PropTypes.any,
};

export default FullScreenPlayer;

