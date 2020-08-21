import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";
import {mockFilm, MOCK_BOOL} from "../../mocks-for-tests.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Title click and film card mouse over, mouse out`, () => {
  it(`Should film title be pressed`, () => {
    const onMovieCardMouseOver = jest.fn();
    const onMovieCardMouseOut = jest.fn();
    const filmCard = shallow(
        <FilmCard
          film = {mockFilm}
          isPlaying = {MOCK_BOOL}
          onMovieCardMouseOver = {onMovieCardMouseOver}
          onMovieCardMouseOut = {onMovieCardMouseOut}
        />
    );

    const filmCards = filmCard.find(`article.small-movie-card`);

    filmCards.forEach((film) => {
      film.props().onClick();
    });
    filmCards.simulate(`mouseover`);
    filmCards.simulate(`mouseout`);

    expect(onMovieCardMouseOver.mock.calls.length).toBe(1);
    expect(onMovieCardMouseOver.mock.calls[0][0]).toMatchObject(mockFilm);
    expect(onMovieCardMouseOut.mock.calls.length).toBe(1);
  });
});
