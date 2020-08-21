import React from "react";
import {Switch, Route, BrowserRouter, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {AppRoute} from "../../constants.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {getShowMoreFilms} from "../../reducer/state/selectors.js";
import {getFilms, getPromoFilm} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import FullScreenPlayer from "../full-screen-player/full-screen-player.jsx";
import MyList from "../my-list/my-list.jsx";
import LoadingError from "../loading-error/loading-error.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import PrivateRouteForLogin from "../private-route-for-login/private-route-for-login.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import withFormValidation from "../../hocs/with-form-validation/with-form-validation.jsx";

const MoviePage = withRouter(FilmPage);
const MainPage = withRouter(Main);
const FullScreenVideoPlayer = withPlayer(FullScreenPlayer);
const FullScreenVideoPlayerPage = withRouter(FullScreenVideoPlayer);
const AddReviewWrapper = withFormValidation(AddReview);
const AddReviewPage = withRouter(AddReviewWrapper);
const SignInPage = withRouter(SignIn);

const App = (props) => {
  const {films, promoFilm, login, authorizationStatus, filmsCount, showMoreFilms, removeFavoriteFilms, addFavoriteFilms} = props;
  if (films === null || films === undefined || promoFilm === null || promoFilm === undefined) {
    return (
      <LoadingError />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainPage
            films = {films}
            filmsCount = {filmsCount}
            showMoreFilms = {showMoreFilms}
            authorizationStatus = {authorizationStatus}
            promoFilm = {promoFilm}
            removeFavoriteFilms = {removeFavoriteFilms}
            addFavoriteFilms = {addFavoriteFilms}
          />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          render={() => {
            return (
              <MyList />
            );
          }}
        />
        <Route exact path={AppRoute.FULL_SCREEN_PLAER}>
          <FullScreenVideoPlayerPage
            films = {films}
            muted = {true}
            autoPlay = {true}
          />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.ADD_REVIEW}
          render={() => {
            return (
              <AddReviewPage
                films = {films}
              />
            );
          }}
        />
        <Route exact path={AppRoute.FILM_PAGE}>
          <MoviePage
            films = {films}
            authorizationStatus = {authorizationStatus}
            removeFavoriteFilms = {removeFavoriteFilms}
            addFavoriteFilms = {addFavoriteFilms}
          />
        </Route>
        <PrivateRouteForLogin
          exact
          path={AppRoute.LOGIN}
          authorizationStatus={authorizationStatus}
          render={() => {
            return (
              <SignInPage
                onSubmit={login}
                authorizationStatus={authorizationStatus}
              />
            );
          }}
        />
        <Route exact path={AppRoute.ERROR}>
          <LoadingError />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
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
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  history: PropTypes.any,
  addFavoriteFilms: PropTypes.func.isRequired,
  removeFavoriteFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filmsCount: getShowMoreFilms(state),
  films: getFilms(state),
  promoFilm: getPromoFilm(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  showMoreFilms() {
    dispatch(ActionCreator.showMoreFilms());
  },
  login(authData, onSuccess) {
    dispatch(UserOperation.login(authData, onSuccess));
  },
  addFavoriteFilms(id) {
    dispatch(DataOperation.addFavoriteFilms(id));
  },
  removeFavoriteFilms(id) {
    dispatch(DataOperation.removeFavoriteFilms(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

