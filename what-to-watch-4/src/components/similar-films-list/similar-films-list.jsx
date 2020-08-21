import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TIMEOUT, SIMILAR_CARDS_COUNT, ARRAY_START} from "../../constants.js";
import FilmCard from "../film-card/film-card.jsx";

class SimilarFilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.timeoutId = null;
  }

  handleAddTimeout(id, cb) {
    this.timeoutId = setTimeout(() => {
      cb(id);
    }, TIMEOUT);
  }

  handleClearTimeout() {
    clearTimeout(this.timeoutId);
  }

  componentWillUnmount() {
    this.handleClearTimeout();
  }

  render() {
    const {films, handleChange, activeItem, film} = this.props;

    return <div className="catalog__movies-list">
      {films.filter((movie) => movie.genre === film.genre)
       .map((movie) => {
         return (
           <FilmCard
             key = {movie.id}
             film = {movie}
             onMovieCardMouseOver={() => {
               this.handleAddTimeout(movie.id, handleChange);
             }}
             onMovieCardMouseOut={() => {
               this.handleClearTimeout();
               handleChange(null);
             }
             }
             isPlaying={movie.id === activeItem}
           />);
       }).slice(ARRAY_START, SIMILAR_CARDS_COUNT)}
    </div>;
  }
}

SimilarFilmsList.propTypes = {
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
  activeItem: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
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
  }).isRequired
};

export default SimilarFilmsList;
