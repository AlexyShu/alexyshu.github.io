import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCurentFilm} from "../../utils.js";
import {AppRoute, MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from "../../constants.js";
import {Operation} from "../../reducer/data/data.js";
import {sendReview} from "../../reducer/data/selectors.js";


class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._submitFormRef = createRef();
    this._commentRef = createRef();
    this._sendCommentButtonRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFormDisability = this.toggleFormDisability.bind(this);
  }

  toggleFormDisability() {
    this._commentRef.current.disabled = !this._commentRef.current.disabled;
    this._sendCommentButtonRef.current.disabled = !this._sendCommentButtonRef
      .current.disabled;
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;
    const film = getCurentFilm(this.props.films, this.props);
    evt.preventDefault();
    this.toggleFormDisability();

    onSubmit(film.id,
        {
          rating: this._submitFormRef.current.rating.value,
          comment: this._commentRef.current.value
        },
        () => {
          this.toggleFormDisability();
          if (this.props.successComment) {
            this.props.history.push(`/films/${film.id}`);
          } else {
            this.props.history.push(`/loading-error`);
          }
        }
    );
  }


  render() {
    const {films, handleChangeTextValidation, isFormInvalid} = this.props;
    const film = getCurentFilm(films, this.props);

    return (
      film ?
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={film.bigPosterUrl} alt={film.name} />
            </div>
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header">
              <div className="logo">
                <Link to={AppRoute.MAIN} className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>
              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link to={`/films/${film.id}`} className="breadcrumbs__link">
                      {film.name}
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>
              <div className="user-block">
                <div className="user-block__avatar">
                  <img
                    src="/img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </div>
            </header>
            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={film.posterUrl}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>
          </div>
          <div className="add-review">
            <form
              action="#"
              className="add-review__form"
              onSubmit={this.handleSubmit}
              ref={this._submitFormRef}
            >
              <div className="rating">
                <div className="rating__stars">
                  <input
                    className="rating__input"
                    id="star-1"
                    type="radio"
                    name="rating"
                    value="1"
                  />
                  <label className="rating__label" htmlFor="star-1">
                    Rating 1
                  </label>
                  <input
                    className="rating__input"
                    id="star-2"
                    type="radio"
                    name="rating"
                    value="2"
                  />
                  <label className="rating__label" htmlFor="star-2">
                    Rating 2
                  </label>
                  <input
                    className="rating__input"
                    id="star-3"
                    type="radio"
                    name="rating"
                    value="3"
                    defaultChecked
                  />
                  <label className="rating__label" htmlFor="star-3">
                    Rating 3
                  </label>
                  <input
                    className="rating__input"
                    id="star-4"
                    type="radio"
                    name="rating"
                    value="4"
                  />
                  <label className="rating__label" htmlFor="star-4">
                    Rating 4
                  </label>
                  <input
                    className="rating__input"
                    id="star-5"
                    type="radio"
                    name="rating"
                    value="5"
                  />
                  <label className="rating__label" htmlFor="star-5">
                    Rating 5
                  </label>
                </div>
              </div>
              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  ref={this._commentRef}
                  minLength={MIN_REVIEW_LENGTH}
                  maxLength={MAX_REVIEW_LENGTH}
                  onChange={handleChangeTextValidation}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    ref={this._sendCommentButtonRef}
                    disabled={isFormInvalid}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        : null);
  }
}

AddReview.propTypes = {
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
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.any,
  successComment: PropTypes.bool,
  handleChangeTextValidation: PropTypes.func,
  isFormInvalid: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  successComment: sendReview(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, commentData, onSuccess) {
    dispatch(Operation.addComment(id, commentData, onSuccess));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
