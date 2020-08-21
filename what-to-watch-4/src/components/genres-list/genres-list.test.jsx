import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";
import {Provider} from "react-redux";
import Namespace from "../../reducer/namespace.js";
import configureStore from "redux-mock-store";
import {mockFilms, mokcFunction, MOCK_ACTIVE_FILTER, MOCK_FILMS_COUNT} from "../../mocks-for-tests.js";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([]);

describe(`Render correct GenresList`, () => {
  it(`Render GenresList`, () => {
    const store = mockStore({
      [Namespace.DATA]: {
        films: mockFilms,
      },
      [Namespace.STATE]: {
        filmsCount: MOCK_FILMS_COUNT
      }
    });
    const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <GenresList
              films = {mockFilms}
              onFilterClick = {mokcFunction}
              activeFilter = {MOCK_ACTIVE_FILTER}
              handleChange= {mokcFunction}
              filmsCount = {MOCK_FILMS_COUNT}
              filteredFilms = {mockFilms}
              showMoreFilms = {mokcFunction}
            />
          </MemoryRouter>
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
