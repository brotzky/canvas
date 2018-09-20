import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import "./layout.css";

const description = "Apple Canvas Scrubbing Example by Narative";
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content: description
            },
            {
              name: "keywords",
              content: "canvas, apple, javascript, animation, example"
            }
          ]}
        >
          <meta
            name="image"
            content="https://www.apple.com/imac-pro/images/og_image.jpg"
          />
          <meta property="og:url" content="https://apple-canvas.netlify.com/" />
          <meta property="og:title" content={description} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content="https://www.apple.com/imac-pro/images/og_image.jpg"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={description} />
          <meta name="twitter:description" content={description} />
          <meta
            name="twitter:image"
            content="https://www.apple.com/imac-pro/images/og_image.jpg"
          />
          <html lang="en" />
        </Helmet>
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
