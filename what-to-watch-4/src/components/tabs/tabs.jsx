import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {TabName} from "../../constants.js";
import {getTextRating, formatDate} from "../../utils.js";
import {getComments} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const Tabs = (props) => {
  const {film, comments, onTabOverviewClick, getActiveTab, setActiveTab, selectedTab} = props;

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item ${getActiveTab(TabName.OVERVIEW)}`}>
            <a
              className="movie-nav__link"
              onClick={() => {
                setActiveTab(TabName.OVERVIEW);
              }}
            >
                Overview
            </a>
          </li>
          <li className={`movie-nav__item ${getActiveTab(TabName.DETAILS)}`}>
            <a
              className="movie-nav__link"
              onClick={() => {
                setActiveTab(TabName.DETAILS);
              }}
            >
                Details
            </a>
          </li>
          <li className={`movie-nav__item ${getActiveTab(TabName.REVIEWS)}`}>
            <a
              className="movie-nav__link"
              onClick={() => {
                setActiveTab(TabName.REVIEWS);
                onTabOverviewClick(film.id);
              }}
            >
                Reviews
            </a>
          </li>
        </ul>
      </nav>
      {selectedTab === TabName.OVERVIEW && (
          <>
            <div className="movie-rating">
              <div className="movie-rating__score">{film.rating.toFixed(1)}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getTextRating(film.rating)}</span>
                <span className="movie-rating__count">{film.votes} ratings</span>
              </p>
            </div>
            <div className="movie-card__text">
              <p>{film.description}</p>
              <p className="movie-card__director"><strong>{film.director}</strong></p>
              <p className="movie-card__starring"><strong>{film.starring.join(`, `)}</strong></p>
            </div>
          </>
      )}
      {selectedTab === TabName.DETAILS && (
          <>
            <div className="movie-card__text movie-card__row">
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Director</strong>
                  <span className="movie-card__details-value">
                    {film.director}
                  </span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Starring</strong>
                  <span className="movie-card__details-value">
                    {film.starring}
                  </span>
                </p>
              </div>
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">
                    {film.runTime}
                  </span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">
                    {film.genre}
                  </span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">
                    {film.releaseYear}
                  </span>
                </p>
              </div>
            </div>
          </>
      )}
      {selectedTab === TabName.REVIEWS && (
          <>
            <div className="movie-card__reviews movie-card__row">
              <div className="movie-card__reviews-col">
                {comments.map((comment, index) => (
                  <div className="review" key={index + comment.user.id}>
                    <blockquote className="review__quote">
                      <p className="review__text">{comment.comment}</p>
                      <footer className="review__details">
                        <cite className="review__author">{comment.user.name}</cite>
                        <time className="review__date" dateTime={comment.date}>
                          {formatDate(new Date(comment.date))}
                        </time>
                      </footer>
                    </blockquote>
                    <div className="review__rating">{comment.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
      )}
    </div>
  );
};

Tabs.propTypes = {
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
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.number,
        rating: PropTypes.number,
        user: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      })),
  onTabOverviewClick: PropTypes.func,
  getActiveTab: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  comments: getComments(state)
});

const mapDispatchToProps = (dispatch) => ({
  onTabOverviewClick(id) {
    dispatch(DataOperation.getComments(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

