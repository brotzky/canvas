import React, { Component } from "react";

import Layout from "../components/layout";
import VideoWrapper from "../components/video-wrapper";

import { initializeCanvas, scrubThroughFrames } from "../utils/canvas";

class IndexPage extends Component {
  height = 3000;

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

    scrubThroughFrames(this.canvas, (scrollTop * 1.75) / this.height);
  };

  render() {
    return (
      <Layout>
        <div style={{ height: this.height + "px" }}>
          <VideoWrapper>
            <canvas ref={element => (this.canvas = element)} />
          </VideoWrapper>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
