import React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.jsx";
import {mockFilm, mockComments, mokcFunction} from "../../mocks-for-tests.js";

const MockComponent = () => <div></div>;
const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          film = {mockFilm}
          comments={mockComments}
          onTabOverviewClick = {mokcFunction}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
