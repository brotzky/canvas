import React, { Component } from "react";

import Layout from "../components/layout";
import VideoWrapper from "../components/video-wrapper";

import { initializeCanvas, scrubThroughFrames } from "../utils/canvas";

class IndexPage extends Component {
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
    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    scrubThroughFrames(this.canvas, (scrollTop * 1.5) / 3750);
  };

  render() {
    return (
      <Layout>
        <VideoWrapper>
          <canvas ref={element => (this.canvas = element)} />
        </VideoWrapper>
      </Layout>
    );
  }
}

export default IndexPage;
