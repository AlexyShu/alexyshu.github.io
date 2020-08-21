import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {mokcFunction, MOCK_FILMS_COUNT, mockFilms, MOCK_STRING, MOCK_BOOL} from "../../mocks-for-tests.js";
import Namespace from "../../reducer/namespace.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";

const mockStore = configureStore([]);

const match = {
  params: {
    id: 1,
  }
};

describe(`Render correct AddReview`, () => {
  it(`Render AddReview`, () => {
    const store = mockStore({
      [Namespace.DATA]: {
        films: mockFilms,
        comments: []
      },
      [Namespace.STATE]: {
        filmsCount: MOCK_FILMS_COUNT,
        activeFilter: MOCK_STRING
      },
      [Namespace.USER]: {
        authorizationStatus: MOCK_STRING
      }
    });
    const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <AddReview
              match = {match}
              onMovieCaronSubmitdMouseOut = {mokcFunction}
              films = {mockFilms}
              handleChangeTextValidation = {mokcFunction}
              isFormInvalid = {MOCK_BOOL}
            />
          </MemoryRouter>
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
