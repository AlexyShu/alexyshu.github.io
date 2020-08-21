import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from "../../constants.js";


const withFormValidation = (Component) => {
  class WithFormValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFormInvalid: true
      };

      this.handleChangeTextValidation = this.handleChangeTextValidation.bind(this);
    }

    handleChangeTextValidation(evt) {
      this.setState({
        isFormInvalid:
          evt.target.value.length < MIN_REVIEW_LENGTH ||
          evt.target.value.length > MAX_REVIEW_LENGTH
      });
    }

    render() {
      const {isFormInvalid} = this.state;
      return (
        <Component
          {...this.props}
          handleChangeTextValidation = {this.handleChangeTextValidation}
          isFormInvalid = {isFormInvalid}
        />
      );
    }
  }

  WithFormValidation.propTypes = {
    films: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          posterUrl: PropTypes.string,
          previewUrl: PropTypes.string,
          bigPosterUrl: PropTypes.string,
          backgroundColor: PropTypes.string,
          description: PropTypes.string,
          rating: PropTypes.number,
          votes: PropTypes.number,
          director: PropTypes.string,
          starring: PropTypes.arrayOf(PropTypes.string),
          runTime: PropTypes.string,
          genre: PropTypes.string,
          releaseYear: PropTypes.number,
          id: PropTypes.number,
          isFavorite: PropTypes.bool,
          videoUrl: PropTypes.string,
          trailerUrl: PropTypes.string
        })
    ).isRequired,
  };

  return WithFormValidation;
};

export default withFormValidation;

