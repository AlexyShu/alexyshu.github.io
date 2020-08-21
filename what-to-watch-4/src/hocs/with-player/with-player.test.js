
import React from "react";
import renderer from "react-test-renderer";
import withPlayer from "./with-player.jsx";
import {MOCK_BOOL} from "../../mocks-for-tests.js";

const MockComponent = () => <div></div>;
const MockComponentWrapped = withPlayer(MockComponent);

it(`withPlayer is rendered correctly`, () => {
  const tree = renderer
    .create(
        <MockComponentWrapped
          muted={MOCK_BOOL}
          autoPlay={MOCK_BOOL}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
