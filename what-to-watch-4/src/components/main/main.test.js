import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {MemoryRouter} from "react-router-dom";
import {mockFilm, mockFilms, mokcFunction, MOCK_FILMS_COUNT, MOCK_STRING} from "../../mocks-for-tests.js";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

describe(`Render correct Main`, () => {
  it(`Render Main`, () => {
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
            <Main
              promoFilm = {mockFilm}
              films = {mockFilms}
              filmsCount = {MOCK_FILMS_COUNT}
              showMoreFilms = {mokcFunction}
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


