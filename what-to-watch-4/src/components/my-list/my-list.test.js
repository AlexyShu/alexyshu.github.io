import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list.jsx";
import {mockFilms, mockFilm, MOCK_FILMS_COUNT, MOCK_STRING} from "../../mocks-for-tests.js";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Namespace from "../../reducer/namespace.js";

const mockStore = configureStore([]);

describe(`Render correct MyList`, () => {
  it(`Render MyList`, () => {
    const store = mockStore({
      [Namespace.DATA]: {
        films: mockFilms,
        promoFilm: mockFilm,
        favoriteFilms: mockFilms
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
            <MyList
              favoriteFilmsfilms = {mockFilms}
            />
          </MemoryRouter>
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
