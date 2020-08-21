import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../constants.js";
import {getFavoriteFilms} from "../../reducer/data/selectors.js";
import FavoritsFilms from "../favorits-films/favorits-films.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

const FavoritsFilmsWrapper = withActiveItem(FavoritsFilms);

const MyList = (props) => {
  const {favoriteFilms} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">My list</h1>
        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FavoritsFilmsWrapper
          favoriteFilms = {favoriteFilms}
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
  );
};

MyList.propTypes = {
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
};

const mapStateToProps = (state) => ({
  favoriteFilms: getFavoriteFilms(state),
});

export {MyList};
export default connect(mapStateToProps)(MyList);
