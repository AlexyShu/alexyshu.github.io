import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utils.js";
import {TIMESTAMP} from "../../constants.js";

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = createRef();
      this.state = {
        isPlaying: false,
        videoDuration: 0,
        currentTime: 0
      };

      this.getToggleProgress = this.getToggleProgress.bind(this);
      this.getTimeDuration = this.getTimeDuration.bind(this);
      this.loadedMetadataHandler = this.loadedMetadataHandler.bind(this);
      this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
      this.fullScreenHandler = this.fullScreenHandler.bind(this);
      this.playButtonHandler = this.playButtonHandler.bind(this);
      this.exitButtonHandler = this.exitButtonHandler.bind(this);
    }

    getToggleProgress() {
      return String((this.state.currentTime / this.state.videoDuration) * TIMESTAMP);
    }

    getTimeDuration() {
      return formatTime(this.state.videoDuration - this.state.currentTime);
    }

    timeUpdateHandler(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime)
      });
    }

    loadedMetadataHandler(evt) {
      this.setState({
        isPlaying: this.props.autoPlay,
        videoDuration: Math.floor(evt.target.duration)
      });
    }

    fullScreenHandler() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    playButtonHandler() {
      const video = this._videoRef.current;
      if (video.paused) {
        video.play();
        this.setState({isPlaying: true});
      } else {
        video.pause();
        this.setState({isPlaying: false});
      }
    }

    exitButtonHandler() {
      const video = this._videoRef.current;
      video.pause();
    }

    componentDidMount() {
      this.setState({isPlaying: this.props.autoPlay});
      const video = this._videoRef.current;
      if (video) {
        video.muted = this.props.muted;
        video.play();
      }
    }

    render() {
      const {isPlaying} = this.state;
      return <Component
        {...this.props}
        videoRef={this._videoRef}
        getToggleProgress={this.getToggleProgress}
        getTimeDuration={this.getTimeDuration}
        onLoadedMetadata={this.loadedMetadataHandler}
        onTimeUpdate={this.timeUpdateHandler}
        onFullscreenButtonClick={this.fullScreenHandler}
        onPlayButtonClick={this.playButtonHandler}
        onExitButtonClick={this.exitButtonHandler}
        isPlaying={isPlaying}
      />;
    }
  }

  WithPlayer.propTypes = {
    muted: PropTypes.bool.isRequired,
    autoPlay: PropTypes.bool.isRequired,
  };

  return WithPlayer;
};

export default withPlayer;
