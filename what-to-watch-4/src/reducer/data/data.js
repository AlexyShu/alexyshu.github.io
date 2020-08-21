import {extend, adapterData, adapterFilm} from "../../utils.js";

const SuccessPost = {
  SUCSESS: true,
  ERROR: false
};

const initialState = {
  films: [],
  comments: [],
  promoFilm: {},
  favoriteFilms: [],
  successComment: SuccessPost.ERROR,
};

const ActionType = {
  GET_FILMS: `GET_FILMS`,
  GET_PROMO_FILM: `GET_PROMO_FILM`,
  GET_COMMENTS: `GET_COMMENTS`,
  ADD_COMMENTS: `ADD_COMMENTS`,
  GET_FAVORITE_FILMS: `GET_FAVORITE_FILMS`,
  SEND_SUCCESS_COMMENT: `SEND_SUCCESS_COMMENT`,
  ADD_FAVORITE_FILMS: `ADD_FAVORITE_FILMS`,
  DELETE_FAVORITE_FILMS: `DELETE_FAVORITE_FILMS`
};

const ActionCreator = {
  getFilms: (films) => ({
    type: ActionType.GET_FILMS,
    payload: films
  }),
  getPromoFilm: (film) => ({
    type: ActionType.GET_PROMO_FILM,
    payload: film
  }),
  getComments: (comments) => ({
    type: ActionType.GET_COMMENTS,
    payload: comments
  }),
  getFavoriteFilms: (favoriteFilms) => ({
    type: ActionType.GET_FAVORITE_FILMS,
    payload: favoriteFilms
  }),
  sendReview: (status) => ({
    type: ActionType.SEND_SUCCESS_COMMENT,
    payload: status,
  }),
  addFavoriteFilms: (film) => {
    return {
      type: ActionType.ADD_FAVORITE_FILMS,
      payload: film,
    };
  },
  removeFavoriteFilms: (film) => {
    return {
      type: ActionType.DELETE_FAVORITE_FILMS,
      payload: film,
    };
  },
};

const Operation = {
  getFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.getFilms(adapterData(response.data)));
    });
  },
  getPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {
      dispatch(ActionCreator.getPromoFilm(adapterFilm(response.data)));
    });
  },
  getComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
    .then((response) => {
      dispatch(ActionCreator.getComments(response.data));
    });
  },
  addComment: (id, commentData, onSuccess) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${id}`, {
        rating: commentData.rating,
        comment: commentData.comment
      })
    .then(() => {
      dispatch(ActionCreator.sendReview(SuccessPost.SUCSESS));
      onSuccess();
    });
  },
  getFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      dispatch(ActionCreator.getFavoriteFilms(adapterData(response.data)));
    });
  },
  addFavoriteFilms: (id) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/1`)
      .then((response) => {
        dispatch(ActionCreator.addFavoriteFilms(adapterFilm(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },
  removeFavoriteFilms: (id) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/0`)
      .then((response) => {
        dispatch(ActionCreator.removeFavoriteFilms(adapterFilm(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const getFilmForMyList = (film, payload) => {
  if (film.id === payload.id) {
    return extend(film, {
      isFavorite: !film.isFavorite
    });
  } else {
    return film;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FILMS:
      return extend(state, {
        films: action.payload
      });
    case ActionType.GET_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload
      });
    case ActionType.GET_COMMENTS:
      return extend(state, {
        comments: action.payload
      });
    case ActionType.SEND_SUCCESS_COMMENT:
      return extend(state, {
        successComment: action.payload
      });
    case ActionType.ADD_FAVORITE_FILMS:
      return extend(state, {
        promoFilm: getFilmForMyList(state.promoFilm, action.payload),
        films: state.films.map((film) => getFilmForMyList(film, action.payload)),
        favoriteFilms: [...state.favoriteFilms, action.payload]
      });
    case ActionType.DELETE_FAVORITE_FILMS:
      return extend(state, {
        promoFilm: getFilmForMyList(state.promoFilm, action.payload),
        films: state.films.map((film) => getFilmForMyList(film, action.payload)),
        favoriteFilms: state.favoriteFilms.filter((film) => film.id !== action.payload.id),
      });
    case ActionType.GET_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
