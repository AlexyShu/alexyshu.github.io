import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";
import {mokcFunction} from "../../mocks-for-tests.js";

describe(`Render correct ShowMoreButton`, () => {
  it(`Render ShowMoreButton`, () => {
    const tree = renderer
    .create(<ShowMoreButton
      showMoreFilms = {mokcFunction}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});


