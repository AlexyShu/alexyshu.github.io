import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Player from "../player/player.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";

const VideoPlayer = withPlayer(Player);

const FilmCard = (props) => {
  const {film, onMovieCardMouseOver, onMovieCardMouseOut, isPlaying} = props;

  return (
    <Link to={`/films/${film.id}`} className="small-movie-card catalog__movies-card small-movie-card__link">
      <article
        onMouseOver={onMovieCardMouseOver}
        onMouseOut={onMovieCardMouseOut}
      >
        <div className="small-movie-card__image">
          {!isPlaying && (
            <img
              src={film.posterUrl}
              alt={film.name}
              width="280"
              height="175"
            />
          )}
          {isPlaying && (
            <VideoPlayer
              film = {film}
              muted = {true}
              autoPlay = {true}
            />
          )}
        </div>
        <h3 className="small-movie-card__title">
          {film.name}
        </h3>
      </article>
    </Link>
  );
};

FilmCard.propTypes = {
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
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardMouseOver: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
};

export default FilmCard;
