import React, { Component } from "react";

import Layout from "../components/layout";
import VideoWrapper from "../components/video-wrapper";

import { initializeCanvas, scrubThroughFrames } from "../utils/canvas";

class IndexPage extends Component {
  height = 4000;
  scrollCoefficient = 3;

  componentDidMount() {
    initializeCanvas(this.canvas);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll = () => {
    if (!this.canvas) {
      return;
    }

    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const scrollPercentage = (scrollTop * this.scrollCoefficient) / this.height;

    scrubThroughFrames(this.canvas, scrollPercentage);
  };

  render() {
    const height = this.height - this.height / this.scrollCoefficient + "px";
    return (
      <Layout>
        <div style={{ height }}>
          <VideoWrapper>
            <canvas ref={element => (this.canvas = element)} />
          </VideoWrapper>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
