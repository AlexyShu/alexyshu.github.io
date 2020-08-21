import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list.jsx";
import {Provider} from "react-redux";
import Namespace from "../../reducer/namespace.js";
import configureStore from "redux-mock-store";
import {mockFilms, MOCK_ACTIVE_FILTER, MOCK_FILMS_COUNT, mokcFunction} from "../../mocks-for-tests.js";
import {MemoryRouter} from "react-router-dom";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`Filter click`, () => {
  it(`Should filter be pressed`, () => {
    const store = mockStore({
      [Namespace.DATA]: {
        films: mockFilms,
      },
      [Namespace.STATE]: {
        filmsCount: MOCK_FILMS_COUNT
      }
    });
    const onFilterClick = jest.fn();
    const handleChange = jest.fn();
    const filtersList = mount(
        <Provider store={store}>
          <MemoryRouter>
            <GenresList
              films = {mockFilms}
              onFilterClick = {onFilterClick}
              activeFilter = {MOCK_ACTIVE_FILTER}
              handleChange = {handleChange}
              filmsCount = {MOCK_FILMS_COUNT}
              filteredFilms = {mockFilms}
              showMoreFilms = {mokcFunction}
            />
          </MemoryRouter>
        </Provider>);

    const filters = filtersList.find(`li.catalog__genres-item`);
    const filtersCount = filters.length;

    filters.forEach((filter) => {
      filter.simulate(`click`);
    });

    expect(onFilterClick).toHaveBeenCalledTimes(filtersCount);
  });
});

