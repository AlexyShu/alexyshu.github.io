import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item.jsx";
import {mockFilms, MOCK_FILMS_COUNT, mokcFunction} from "../../mocks-for-tests.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div></div>;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change selected movie ID on mouseover/mouseout`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        films = {mockFilms}
        filmsCount = {MOCK_FILMS_COUNT}
        onFilmCardClick = {mokcFunction}
        filteredFilms = {mockFilms}
      />
  );

  expect(wrapper.props().activeItem).toEqual(null);

  wrapper.props().handleChange(0);
  expect(wrapper.props().activeItem).toEqual(0);

});
