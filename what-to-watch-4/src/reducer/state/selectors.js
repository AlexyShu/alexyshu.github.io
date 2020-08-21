import Namespace from "../namespace.js";

export const getShowMoreFilms = (state) => {
  return state[Namespace.STATE].filmsCount;
};

export const getActiveFilter = (state) => {
  return state[Namespace.STATE].activeFilter;
};

