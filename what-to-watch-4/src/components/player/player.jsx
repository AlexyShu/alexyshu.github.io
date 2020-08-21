import React from "react";
import PropTypes from "prop-types";

const Player = (props) => {
  const {film, videoRef} = props;
  return (
    <video
      ref={videoRef}
      poster={film.posterUrl}
      controls
      width="100%"
    >
      <source src={film.trailerUrl} />
    </video>
  );
};

Player.propTypes = {
  film: PropTypes.shape({
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
  }).isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(Element)})
  ])
};

export default Player;

