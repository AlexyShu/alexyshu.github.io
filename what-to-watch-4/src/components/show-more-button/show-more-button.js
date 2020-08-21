import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Clock on show more button`, () => {
  it(`Should show norw button be pressed`, () => {
    const onShowMoreButtonClick = jest.fn();
    const showMoreButton = shallow(
        <ShowMoreButton
          showMoreFilms = {onShowMoreButtonClick}
        />
    );

    showMoreButton.find(`article.small-movie-card`).simulate(`click`);
    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
  });
});
