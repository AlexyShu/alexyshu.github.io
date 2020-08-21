import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import GenresList from "../genres-list/genres-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

const GenresWrapper = withActiveItem(GenresList);

const Main = (props) => {
  const {films, filmsCount, showMoreFilms, authorizationStatus, promoFilm, removeFavoriteFilms, addFavoriteFilms} = props;

  return <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoFilm.bigPosterUrl} alt={promoFilm.name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <div className="user-block">
          {authorizationStatus === AuthorizationStatus.AUTH ? (
            <Link to={AppRoute.MY_LIST}>
              <div className="user-block__avatar">
                <img
                  src="/img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </Link>
          ) : (
            <Link to={AppRoute.LOGIN} className="user-block__link">
                Sign in
            </Link>
          )}
        </div>
      </header>
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promoFilm.posterUrl} alt={promoFilm.name} width="218" height="327" />
          </div>
          <div className="movie-card__desc">
            <h2 className="movie-card__title"> {promoFilm.name} </h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre"> {promoFilm.genre} </span>
              <span className="movie-card__year"> {promoFilm.releaseYear} </span>
            </p>
            <div className="movie-card__buttons">
              <button
                onClick={() => {
                  props.history.push(`/player/${promoFilm.id}`);
                }}
                className="btn btn--play movie-card__button"
                type="button"
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                onClick={() => {
                  if (promoFilm.isFavorite) {
                    removeFavoriteFilms(promoFilm.id);
                  } else {
                    addFavoriteFilms(promoFilm.id);
                  }
                }}
                className="btn btn--list movie-card__button"
                type="button"
              >
                {promoFilm.isFavorite ? (
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                ) : (
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                )}
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <GenresWrapper
          films = {films}
          filmsCount = {filmsCount}
          showMoreFilms = {showMoreFilms}
        />
      </section>
      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

Main.propTypes = {
  promoFilm: PropTypes.shape({
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
  filmsCount: PropTypes.number.isRequired,
  showMoreFilms: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  history: PropTypes.any,
  addFavoriteFilms: PropTypes.func.isRequired,
  removeFavoriteFilms: PropTypes.func.isRequired,
};

export default Main;


