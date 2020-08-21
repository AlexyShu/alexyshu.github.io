import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {MOCK_STRING, mockFilm, mockComments, mokcFunction, mockFilms, MOCK_FILMS_COUNT} from "../../mocks-for-tests.js";
import {Provider} from "react-redux";
import Namespace from "../../reducer/namespace.js";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe(`Render correct Tabs`, () => {
  it(`Render Tabs`, () => {
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
          <Tabs
            film = {mockFilm}
            comments={mockComments}
            onTabOverviewClick = {mokcFunction}
            getActiveTab = {mokcFunction}
            setActiveTab = {mokcFunction}
            selectedTab = {MOCK_STRING}
          />
        </Provider>)
  .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
