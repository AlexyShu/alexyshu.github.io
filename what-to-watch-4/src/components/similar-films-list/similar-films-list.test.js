import React from "react";
import renderer from "react-test-renderer";
import SimilarFilmsList from "./similar-films-list.jsx";
import {mockFilms, mokcFunction, MOCK_FILMS_COUNT, mockFilm, MOCK_STRING} from "../../mocks-for-tests.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace.js";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([]);

describe(`Render correct SimilarFilmsList`, () => {
  it(`Render SimilarFilmsList`, () => {
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
            <SimilarFilmsList
              films = {mockFilms}
              activeItem = {MOCK_FILMS_COUNT}
              handleChange = {mokcFunction}
              film = {mockFilm}
            />
          </MemoryRouter>
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
