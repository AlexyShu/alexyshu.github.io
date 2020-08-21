import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import {mokcFunction, MOCK_STRING} from "../../mocks-for-tests.js";
import {MemoryRouter} from "react-router-dom";


describe(`Render correct SignIn`, () => {
  it(`Render SignIn`, () => {
    const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn
            onSubmit = {mokcFunction}
            authorizationStatus = {MOCK_STRING}
            history= {mokcFunction}
          />
        </MemoryRouter>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
