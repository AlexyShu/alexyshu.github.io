import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ALL_GENRES, GENRES_COUNT, ARRAY_START} from "../../constants.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {getFilmsByGenre} from "../../reducer/data/selectors.js";
import {getActiveFilter} from "../../reducer/state/selectors.js";
import FilmsList from "../films-list/films-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

const FilmsWrapper = withActiveItem(FilmsList);

const GenresList = (props) => {
  const {films, onFilterClick, activeFilter, handleChange, filmsCount, filteredFilms, showMoreFilms} = props;
  const filters = [ALL_GENRES, ...new Set(films.map((film) => film.genre))];
  return (
    <React.Fragment>
      <ul className="catalog__genres-list">
        {filters.map((filter, i) => (
          <li
            onClick={()=> {
              handleChange(filter);
              onFilterClick(filter);
            }}
            key={filter + i}
            className={
              `catalog__genres-item ${filter === activeFilter ? `catalog__genres-item--active` : ``}`}
          >
            <a href="#" className="catalog__genres-link">
              {filter}
            </a>
          </li>)
        ).slice(ARRAY_START, GENRES_COUNT)}
      </ul>
      <FilmsWrapper
        filteredFilms = {filteredFilms}
        filmsCount = {filmsCount}
        showMoreFilms = {showMoreFilms}
      />
    </React.Fragment>
  );
};

GenresList.propTypes = {
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
  onFilterClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  filmsCount: PropTypes.number.isRequired,
  filteredFilms: PropTypes.arrayOf(
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
  showMoreFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeFilter: getActiveFilter(state),
  filteredFilms: getFilmsByGenre(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
