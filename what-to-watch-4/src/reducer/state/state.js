import {extend} from "../../utils.js";
import {ALL_GENRES} from "../../constants.js";

const initialState = {
  filmsCount: 8,
  activeFilter: ALL_GENRES,
};

const ActionType = {
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  showMoreFilms: () => ({
    type: ActionType.SHOW_MORE_FILMS,
    payload: null
  }),
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        activeFilter: action.payload
      });
    case ActionType.SHOW_MORE_FILMS:
      return extend(state, {
        filmsCount: state.filmsCount + 8
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
