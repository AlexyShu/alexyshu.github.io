import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";
import {mockFilm, mockFilms, MOCK_FILMS_COUNT, MOCK_STRING, mokcFunction} from "../../mocks-for-tests.js";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

const match = {
  params: {
    id: 1,
  }
};

describe(`Render correct FilmPage`, () => {
  it(`Render FilmPage`, () => {
    const store = mockStore({
      [Namespace.DATA]: {
        films: mockFilms,
        promoFilm: mockFilm
      },
      [Namespace.STATE]: {
        filmsCount: MOCK_FILMS_COUNT
      },
      [Namespace.USER]: {
        authorizationStatus: MOCK_STRING
      }
    });
    const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <FilmPage
              match = {match}
              films = {mockFilms}
              authorizationStatus = {MOCK_STRING}
              history = {mokcFunction}
              addFavoriteFilms = {mokcFunction}
              removeFavoriteFilms = {mokcFunction}
            />
          </MemoryRouter>
        </Provider>)
.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
