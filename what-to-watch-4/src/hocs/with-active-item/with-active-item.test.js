import React from "react";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item.jsx";
import {mockFilms, MOCK_FILMS_COUNT, mokcFunction} from "../../mocks-for-tests.js";

const MockComponent = () => <div></div>;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem is rendered correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          films = {mockFilms}
          filmsCount = {MOCK_FILMS_COUNT}
          onFilmCardClick = {mokcFunction}
          filteredFilms = {mockFilms}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

