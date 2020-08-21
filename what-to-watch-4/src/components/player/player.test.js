import React from "react";
import renderer from "react-test-renderer";
import Player from "./player.jsx";
import {mockFilm, mokcFunction} from "../../mocks-for-tests.js";

describe(`Render correct Player`, () => {
  it(`Render Player`, () => {
    const tree = renderer
    .create(<Player
      film = {mockFilm}
      videoRef = {mokcFunction}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
