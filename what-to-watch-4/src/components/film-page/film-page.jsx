import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getCurentFilm} from "../../utils.js";
import {AppRoute} from "../../constants.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import Tabs from "../tabs/tabs.jsx";
import SimilarFilmsList from "../similar-films-list/similar-films-list.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

const TabsWrapper = withActiveTab(Tabs);
const SimilarFilmsWrapper = withActiveItem(SimilarFilmsList);

const FilmPage = (props) => {
  const {films, authorizationStatus, removeFavoriteFilms, addFavoriteFilms} = props;
  const film = getCurentFilm(films, props);

  return (film ? <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={film.bigPosterUrl} alt={film.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
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
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.releaseYear}</span>
            </p>
            <div className="movie-card__buttons">
              <button
                onClick={() => {
                  props.history.push(`/player/${film.id}`);
                }}
                className="btn btn--play movie-card__button"
                type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                onClick={() => {
                  if (film.isFavorite) {
                    removeFavoriteFilms(film.id);
                  } else {
                    addFavoriteFilms(film.id);
                  }
                }}
                className="btn btn--list movie-card__button"
                type="button"
              >
                {film.isFavorite ? (
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
              {authorizationStatus === AuthorizationStatus.AUTH ? (
                <Link to={`/films/${film.id}/review`} className="btn movie-card__button">Add review</Link>
              ) : (null)}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={film.posterUrl} alt={film.name} width="218" height="327" />
          </div>
          <div className="movie-card__desc">
            <TabsWrapper
              film={film}
            />
          </div>
        </div>
      </div>
    </section>
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <SimilarFilmsWrapper
          films = {films}
          film = {film}
        />
      </section>
      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>
    : null);
};

FilmPage.propTypes = {
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
  authorizationStatus: PropTypes.string.isRequired,
  history: PropTypes.any,
  activeItem: PropTypes.number,
  handleChange: PropTypes.func,
  addFavoriteFilms: PropTypes.func.isRequired,
  removeFavoriteFilms: PropTypes.func.isRequired,
};

export default FilmPage;
