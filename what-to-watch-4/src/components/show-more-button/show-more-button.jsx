import React from "react";
import PropTypes from "prop-types";

const ShowMoreButton = (props) => {
  const {showMoreFilms} = props;
  return (
    <div
      onClick={showMoreFilms}
      className="catalog__more"
    >
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  showMoreFilms: PropTypes.func.isRequired,
};

export default ShowMoreButton;
