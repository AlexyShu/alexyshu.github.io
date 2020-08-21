import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";
import {mockFilm, MOCK_BOOL, mokcFunction, mockFilms, MOCK_FILMS_COUNT, MOCK_STRING} from "../../mocks-for-tests.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace.js";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([]);

describe(`Render correct FilmCard`, () => {
  it(`Render FilmCard`, () => {
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
            <FilmCard
              film = {mockFilm}
              isPlaying = {MOCK_BOOL}
              onMovieCardMouseOver = {mokcFunction}
              onMovieCardMouseOut = {mokcFunction}
            />
          </MemoryRouter>
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});


