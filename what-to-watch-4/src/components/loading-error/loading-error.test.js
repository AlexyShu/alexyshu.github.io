import React from "react";
import renderer from "react-test-renderer";
import LoadingError from "./loading-error.jsx";

describe(`Render correct LoadingError`, () => {
  it(`Render LoadingError`, () => {
    const tree = renderer
    .create(<LoadingError />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
