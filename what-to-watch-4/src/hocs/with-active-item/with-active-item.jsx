import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: null
      };
      this.setActiveItemHandler = this.setActiveItemHandler.bind(this);
    }

    setActiveItemHandler(item) {
      this.setState(() => ({
        activeItem: item
      }));
    }

    render() {
      const {activeItem} = this.state;
      return <Component
        {...this.props}
        activeItem={activeItem}
        handleChange={this.setActiveItemHandler}
      />;
    }
  }

  WithActiveItem.propTypes = {
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
        })),
    onFilmCardClick: PropTypes.func,
    filmsCount: PropTypes.number,
    filteredFilms: PropTypes.arrayOf(
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
        })),
  };

  return WithActiveItem;
};

export default withActiveItem;

