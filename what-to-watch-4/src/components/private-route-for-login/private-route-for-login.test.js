import React from "react";
import renderer from "react-test-renderer";
import PrivateRouteForLogin from "./private-route-for-login.jsx";
import {MOCK_BOOL, MOCK_STRING, mokcFunction} from "../../mocks-for-tests.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([]);
const store = mockStore();

describe(`Render correct PrivateRouteForLogin`, () => {
  it(`Render PrivateRouteForLogin`, () => {
    const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateRouteForLogin
              render={mokcFunction}
              path={MOCK_STRING}
              exact={MOCK_BOOL}
              authorizationStatus={MOCK_STRING}
            />
          </MemoryRouter>
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
