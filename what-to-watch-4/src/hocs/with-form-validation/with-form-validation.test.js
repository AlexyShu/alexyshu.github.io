import React from "react";
import renderer from "react-test-renderer";
import withFormValidation from "./with-form-validation.jsx";
import {mockFilms} from "../../mocks-for-tests.js";

const MockComponent = () => <div></div>;
const MockComponentWrapped = withFormValidation(MockComponent);

it(`withFormValidation is rendered correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          films = {mockFilms}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
