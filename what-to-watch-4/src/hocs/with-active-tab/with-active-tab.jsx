import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TabName} from "../../constants.js";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {selectedTab: TabName.OVERVIEW};
      this.getActiveTab = this.getActiveTab.bind(this);
      this.setActiveTab = this.setActiveTab.bind(this);
    }

    getActiveTab(tabName) {
      return this.state.selectedTab === tabName ? `movie-nav__item--active` : ``;
    }

    setActiveTab(tabName) {
      this.setState({selectedTab: tabName});
    }

    render() {
      const {selectedTab} = this.state;
      return (
        <Component
          {...this.props}
          getActiveTab = {this.getActiveTab}
          selectedTab = {selectedTab}
          setActiveTab = {this.setActiveTab}
        />
      );
    }
  }

  WithActiveTab.propTypes = {
    film: PropTypes.shape({
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
    }).isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
          comment: PropTypes.string,
          date: PropTypes.string,
          id: PropTypes.number,
          rating: PropTypes.number,
          user: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
          })
        })),
    onTabOverviewClick: PropTypes.func
  };

  return WithActiveTab;
};

export default withActiveTab;

