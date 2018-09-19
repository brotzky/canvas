module.exports = {
  siteMetadata: {
    title: "Apple Canvas Scrubbing Example by Narative"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV === "development"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "Narative",
        start_url: "/",
        background_color: "#1a1a1a",
        theme_color: "#1a1a1a",
        display: "minimal-ui",
        icon: "src/images/narative-favicon.png" // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline"
  ]
};
