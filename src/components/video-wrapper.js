import React, { Component } from "react";
import styled from "styled-components";

class VideoWrapper extends Component {
  componentDidMount() {
    this.scaleImageToScreen();
    window.addEventListener("resize", this.scaleImageToScreen);
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.scaleImageToScreen);
    }
  }

  scaleImageToScreen = () => {
    if (!this.container) {
      return;
    }

    const imageHeight = 1420;
    const imageWidth = 1752;
    const height = window.innerHeight;
    const width = window.innerWidth;

    const scaleHeight = height / (imageHeight / 0.8);
    const scaleWidth = width / (imageWidth / 0.8);
    const scale = scaleHeight > scaleWidth ? scaleWidth : scaleHeight;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StickyContainer = styled.div`
  height: calc(100vh - 96px);
  position: sticky;
  top: 6vh;
  overflow: hidden;
  transition: opacity 0.6s ease;
`;
