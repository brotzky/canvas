import React, { Component } from "react";
import styled from "styled-components";

class VideoWrapper extends Component {
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleResize);
    }
  }

  handleResize = () => {
    if (!this.container) {
      return;
    }

    const imageHeight = 1420;
    const height = window.innerHeight;

    const scale = height / (imageHeight / 0.8);
    this.container.style.transform = `translate3d(0, -50%, 0) scale(${scale})`;
  };

  render() {
    return (
      <StickyContainer>
        <VideoContainer ref={element => (this.container = element)}>
          {this.props.children}
        </VideoContainer>
      </StickyContainer>
    );
  }
}

export default VideoWrapper;

const VideoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%) scale(1);
`;

const StickyContainer = styled.div`
  height: calc(100vh - 96px);
  position: sticky;
  top: 6vh;
  overflow: hidden;
  transition: opacity 0.6s ease;
`;
