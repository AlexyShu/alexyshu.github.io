import {reducer, ActionType, ActionCreator} from "../../reducer/state/state.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    filmsCount: 8,
    activeFilter: `All genres`
  });
});

describe(`Reducer return current value`, () => {
  it(`Reducer should change films count`, () => {
    expect(reducer({
      filmsCount: 8
    }, {
      type: ActionType.SHOW_MORE_FILMS,
      payload: null,
    })).toEqual({
      filmsCount: 8 + 8
    });
    expect(reducer({
      filmsCount: 16
    }, {
      type: ActionType.SHOW_MORE_FILMS,
      payload: null,
    })).toEqual({
      filmsCount: 16 + 8
    });
    expect(reducer({
      filmsCount: 24
    }, {
      type: ActionType.SHOW_MORE_FILMS,
      payload: null,
    })).toEqual({
      filmsCount: 24 + 8
    });
  });
});

it(`Reducer should change current genre`, () => {
  expect(reducer({
    activeFilter: `Drama`
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Drama`,
  })).toEqual({
    activeFilter: `Drama`
  });
  expect(reducer({
    activeFilter: `Comedy`
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedy`,
  })).toEqual({
    activeFilter: `Comedy`
  });
  expect(reducer({
    activeFilter: `Action`
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Action`,
  })).toEqual({
    activeFilter: `Action`
  });
});

describe(`Action creators work correctly for action SHOW MORE FILMS`, () => {
  it(`Action creator for show more films returns correct action`, () => {
    expect(ActionCreator.showMoreFilms()).toEqual({
      type: ActionType.SHOW_MORE_FILMS,
      payload: null
    });
  });
  it(`Action creator for change genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`All genres`)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: `All genres`
    });
  });
});

