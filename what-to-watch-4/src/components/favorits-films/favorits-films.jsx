import React from "react";
import PropTypes from "prop-types";
import {TIMEOUT} from "../../constants.js";
import FilmCard from "../film-card/film-card.jsx";

const FavoritsFilms = (props) => {
  const {favoriteFilms, handleChange, activeItem} = props;
  return <div className="catalog__movies-list">
    {favoriteFilms.map((film) => {
      let timeoutId;
      return (
        <FilmCard
          key = {film.id}
          film = {film}
          onMovieCardMouseOver={() => {
            timeoutId = setTimeout(() => {
              handleChange(film.id);
            }, TIMEOUT);
          }}
          onMovieCardMouseOut={() => {
            clearTimeout(timeoutId);
            handleChange(null);
          }
          }
          isPlaying={film.id === activeItem}
        />);
    })}
  </div>;
};

FavoritsFilms.propTypes = {
  favoriteFilms: PropTypes.arrayOf(
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
  activeItem: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

export default FavoritsFilms;
