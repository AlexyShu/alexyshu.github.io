import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {mockFilm, mockFilms, mokcFunction, MOCK_FILMS_COUNT, MOCK_BOOL, MOCK_STRING} from "../../mocks-for-tests.js";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

describe(`Render correct App`, () => {
  it(`Render App`, () => {
    const store = mockStore({
      [Namespace.DATA]: {
        films: mockFilms,
        promoFilm: mockFilm
      },
      [Namespace.STATE]: {
        filmsCount: MOCK_FILMS_COUNT
      },
      [Namespace.USER]: {
        authorizationStatus: MOCK_STRING,
      }
    });
    const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promoFilm = {mockFilm}
            films = {mockFilms}
            showMoreFilms = {mokcFunction}
            muted = {MOCK_BOOL}
            autoPlay = {MOCK_BOOL}
            login = {mokcFunction}
            authorizationStatus = {MOCK_STRING}
            addFavoriteFilms = {mokcFunction}
            removeFavoriteFilms = {mokcFunction}
            history = {mokcFunction}
          />
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
